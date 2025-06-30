from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
import database, models, hashing, schemas, token_access
from sqlmodel import Session, select
from datetime import datetime, timedelta
from . import mail
from pydantic import EmailStr, BaseModel
from utils import otp
import logging

router = APIRouter(
    tags=['Authentication'],
    prefix='/auth'
)

def get_user(session: Session, username: str):
    statement = select(models.User).where(models.User.username == username)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return user

def authenticate_user(session: Session, username: str, password: str):
    user = get_user(session, username)
    if not hashing.verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')
    return user

@router.post('/login', response_model=schemas.Token, status_code=status.HTTP_200_OK)
def login(request: schemas.UserLogin, session: Annotated[Session, Depends(database.get_session)]):
    user = authenticate_user(session, request.username, request.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    access_token_expires = timedelta(minutes=token_access.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token_access.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type='bearer')

@router.post("/forgot-password")
async def forgot_password(
    request: schemas.ForgotPasswordRequest,
    session: Annotated[Session, Depends(database.get_session)]
):
    email = request.email

    statement = select(models.User).where(models.User.email == email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found"
        )

    try:
        code = otp.generate_otp()
        expires_at = otp.get_expiry()
    except Exception as e:
        logging.error(f"Error generating OTP: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating OTP: {str(e)}"
        )

    try:
        reset_entry = models.PasswordResetCode(
            email=email,
            code=code,
            expires_at=expires_at
        )
        session.add(reset_entry)
        session.commit()
    except Exception as e:
        session.rollback()
        logging.error(f"Database error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    try:
        await mail.send_verification_email(
            email,
            "Your password reset code",
            f"Your OTP is: {code}"
        )
    except Exception as e:
        logging.error(f"Failed to send email: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}"
        )

    return {"msg": "OTP sent to email"}

@router.post("/verify-reset-code")
async def verify_reset_code(
    data: schemas.VerifyResetCodeRequest,
    session: Annotated[Session, Depends(database.get_session)]
):
    if not data.code.isdigit() or len(data.code) != 6:
        raise HTTPException(status_code=400, detail="Code must be a 6-digit number")

    statement = select(models.PasswordResetCode).where(
        (models.PasswordResetCode.email == data.email) &
        (models.PasswordResetCode.code == data.code)
    )
    statement = statement.order_by(models.PasswordResetCode.created_at.desc())
    entry = session.exec(statement).first()

    if not entry or entry.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired code")

    entry.verified = True
    session.commit()

    return {"msg": "Code verified successfully"}

@router.post("/reset-password")
async def reset_password(
    data: schemas.ResetPasswordRequest,
    session: Annotated[Session, Depends(database.get_session)]
):
    statement = select(models.PasswordResetCode).where(
        (models.PasswordResetCode.email == data.email) &
        (models.PasswordResetCode.code == data.code) &
        (models.PasswordResetCode.verified == True)
    )
    statement = statement.order_by(models.PasswordResetCode.created_at.desc())
    entry = session.exec(statement).first()
    if not entry or entry.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired code")

    statement = select(models.User).where(models.User.email == data.email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    hashed_pw = hashing.pwd_cxt.hash(data.new_password)
    user.password = hashed_pw
    session.commit()
    return {"msg": "Password reset successful"}
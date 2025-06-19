from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
# from fastapi.security import OAuth2PasswordRequestForm
import database, models, hashing, schemas, token_access
from database import get_session
from sqlmodel import Session
from datetime import datetime, timedelta
from . import mail
from pydantic import EmailStr, BaseModel
from utils import otp


router = APIRouter(
    tags=['Authentication'], 
    prefix='/auth'
)


def get_user(session: database.SessionLocal, username: str):
    user = session.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return user


def authenticate_user(session: database.SessionLocal, username: str, password: str):
    user = get_user(session, username)
    if not hashing.verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')
    return user


@router.post('/login', response_model=schemas.Token, status_code=status.HTTP_200_OK)
def login(request: schemas.UserLogin, session: Annotated[Session, Depends(get_session)]):
    user = authenticate_user(session, request.username, request.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Please verify your email before logging in")

    # generate a jwt token and return it
    access_token_expires = timedelta(minutes=token_access.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token_access.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type='bearer')


@router.post("/forgot-password")
async def forgot_password(
    request: schemas.ForgotPasswordRequest,
    session: database.SessionLocal
):
    email = request.email

    if not email:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found")
    
    code = otp.generate_otp()
    expires_at = otp.get_expiry()

    reset_entry = models.PasswordResetCode(
        email = email,
        code = code,
        expires_at=expires_at
    )
    
    # token = token_access.create_reset_token(email)
    # reset_link = f"http://192.168.73.92:5173/reset-password?token={token}"
    session.add(reset_entry)
    session.commit()

    await mail.send_verification_email(email, "Your password reset code", f"Your OTP is: {code}")
    return {"msg": "OTP sent to email"}


@router.post("/verify-reset-code")
def verify_reset_code(data: schemas.VerifyResetCodeRequest, session: database.SessionLocal):
    entry = (
        session.query(models.PasswordResetCode)
        .filter(models.PasswordResetCode.email == data.email, 
                models.PasswordResetCode.code == data.code)
        .order_by(models.PasswordResetCode.created_at.desc())
        .first()
    )

    if not entry or entry.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired code")
    
    return {"msg": "Code verified"}



@router.post("/reset-password")
async def reset_password(session:database.SessionLocal, data: schemas.ResetPasswordSchema):
    email = token_access.verify_reset_token(data.token)
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invald or expired token")
    
    user = session.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    hashed_pw = hashing.pwd_cxt.hash(data.new_password)
    user["password"] = hashed_pw
    return {"msg": "Password reset successful"}
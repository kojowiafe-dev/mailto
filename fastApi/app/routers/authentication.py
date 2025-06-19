from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
import database, models, hashing, schemas, token_access
from database import get_session
from sqlmodel import Session
from datetime import datetime, timedelta
from . import mail
from pydantic import EmailStr, BaseModel
from utils import otp
from utils.redis_client import r
import random
from datetime import timedelta
import secrets


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
    
    access_token_expires = timedelta(minutes=token_access.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token_access.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type='bearer')


@router.post("/forgot-password")
async def forgot_password(request: schemas.ForgotPasswordRequest, session: database.SessionLocal):
    email = request.email
    user = session.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    otp_code = otp.generate_otp()
    
    # Save OTP in Redis with 5-minute expiry
    r.setex(f"otp:{email}", timedelta(minutes=5), otp_code)
    
    await mail.send_verification_email(email, "Reset your password", f"Your OTP is: {otp_code}")
    return {"msg": "OTP sent to your email"}


@router.post("/verify-reset-code")
async def verify_code(data: schemas.VerifyResetCodeRequest):
    stored_otp = r.get(f"otp:{data.email}")
    
    if not stored_otp or stored_otp != data.code:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # OTP is valid – delete it and issue short session token
    r.delete(f"otp:{data.email}")
    
    session_token = secrets.token_urlsafe(16)  # shorter than 32 chars
    r.setex(f"reset_token:{session_token}", timedelta(minutes=10), data.email)
    
    return {"reset_token": session_token}


@router.post("/reset-password")
async def reset_password(data: schemas.ResetPasswordTokenRequest, session: database.SessionLocal):
    email = r.get(f"reset_token:{data.reset_token}")
    
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    user = session.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password = hashing.pwd_cxt.hash(data.new_password)
    session.commit()
    
    # Clean up token after use
    r.delete(f"reset_token:{data.reset_token}")
    
    return {"msg": "Password reset successful"}

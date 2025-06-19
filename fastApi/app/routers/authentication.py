from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
# from fastapi.security import OAuth2PasswordRequestForm
import schemas, database, models, hashing
from database import get_session
from sqlmodel import Session
from datetime import timedelta
import token_access, models
# from pydantic import BaseModel


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
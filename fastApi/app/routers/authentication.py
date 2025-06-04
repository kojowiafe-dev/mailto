from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
import schemas, database, models, hashing
from datetime import timedelta
import token_access, models


router = APIRouter(
    tags=['Authentication'], 
    prefix='/auth'
)


def get_user(session: database.SessionLocal, email: str):
    user = session.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return user


def authenticate_user(session: database.SessionLocal, email: str, password: str):
    user = get_user(session, email)
    if not hashing.verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')
    return user


@router.post('/login', response_model=schemas.Token, status_code=status.HTTP_200_OK)
def login(request: Annotated[OAuth2PasswordRequestForm, Depends()], session: database.SessionLocal):
    user = authenticate_user(session, request.username, request.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    if not hashing.verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')
    

    # generate a jwt token and return it
    access_token_expires = timedelta(minutes=token_access.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token_access.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type='bearer')
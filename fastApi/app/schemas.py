from datetime import datetime
from sqlmodel import SQLModel, Field



class UserCreate(SQLModel):
    username: str
    email: str
    password: str


class UserResponse(SQLModel):
    id: int
    username: str
    email: str
    is_verified: bool
    created_at: datetime


class UserUpdate(SQLModel):
    username: str | None = None
    email: str | None = None
    password: str | None = None


class UserLogin(SQLModel):
    username: str
    password: str


class MessageCreate(SQLModel):
    name: str
    email: str
    message: str


class MessageResponse(MessageCreate):
    id: int
    created_at: datetime


class MessageUpdate(SQLModel):
    name: str | None = None
    email: str | None = None
    message: str | None = None


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: str | None = None


class ResetPasswordSchema(SQLModel):
    token: str
    new_password: str
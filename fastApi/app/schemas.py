from datetime import datetime
from sqlmodel import SQLModel, Field    
from pydantic import EmailStr, BaseModel
from typing import List, Optional



class UserCreate(SQLModel):
    username: str
    email: str
    password: str


class UserResponse(SQLModel):
    id: int
    username: str
    email: str
    is_verified: bool
    mails: List["MailResponse"] = []
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


class ForgotPasswordRequest(SQLModel):
    email: EmailStr


class VerifyResetCodeRequest(SQLModel):
    email: EmailStr
    code: str


class ResetPasswordRequest(SQLModel):
    email: EmailStr
    code: str
    new_password: str
    

class GetStartedForm(SQLModel):
    companyName: str
    fullName: str
    email: EmailStr
    phone: Optional[str] = None
    industry: str
    companySize: str
    projectType: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    description: Optional[str] = None
    features: List[str] = []
    agreeToTerms: bool
    
    
    
class GetStartedRequest(SQLModel):
    companyName: str
    fullName: str
    email: str
    phone: str
    industry: str
    companySize: str
    projectType: str
        
    
class MailRequest(SQLModel):
    email: str
    subject: str
    content: str
    
    
class MailResponse(SQLModel):
    id: int
    subject: str
    email: str
    content: str
    created_at: datetime
    user_id: int | None = None
    
    class Config:
        orm_mode = True
    
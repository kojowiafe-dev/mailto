from sqlmodel import Relationship, SQLModel, Field
from typing import Optional
from datetime import datetime

# class Message is used to store the messages sent by users.
class Message(SQLModel, table=True):
    __tablename__ = "messages"
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, nullable=False)
    email: str = Field(index=True, nullable=False)
    message: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)



class User(SQLModel, table=True):
    __tablename__ = "user"
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, nullable=False)
    email: str = Field(index=True, unique=True, nullable=False)
    password: str = Field(nullable=False)
    is_verified: bool = Field(index=True, nullable=False, default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    get_started_submissions: list["GetStartedSubmission"] = Relationship(back_populates="user")
    mails: list["Mails"] = Relationship(back_populates="sender")
    
    
class Mails(SQLModel, table=True):
    __tablename__ = "mails"

    id: Optional[int] = Field(default=None, primary_key=True)
    subject: str = Field(nullable=False)
    email: str = Field(nullable=False)
    content: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    sender: Optional[User] = Relationship(back_populates="mails")


# Hybrid: GetStartedSubmission links to user optionally
class GetStartedSubmission(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    companyName: str
    fullName: str
    email: str
    phone: Optional[str] = None
    industry: str
    companySize: str
    projectType: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    description: Optional[str] = None
    features: str  # store as comma-separated string
    agreeToTerms: bool
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="get_started_submissions")


class PasswordResetCode(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, index=True)
    email: str = Field(nullable=False)
    code: str = Field(nullable=False, max_length=6)
    expires_at: datetime = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    verified: bool = Field(default=False)
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
import database, models, schemas
import os
import google.generativeai as genai
import traceback

router = APIRouter(
    prefix="/usermails",
    tags=["UMails"],
    # responses={404: {"description": "Not found"}},
)


# storing user mails in the database
@router.post("/store")
async def store_user_mail(request: schemas.MailResponse, session: database.SessionLocal):
    if not request.subject or not request.email or not request.content:
        raise HTTPException(status_code=400, detail="Subject, email, and content are required")

    mail = models.Mails(subject=request.subject, email=request.email, content=request.content)
    session.add(mail)
    session.commit()
    session.refresh(mail)
    
    return {"message": "Mail stored successfully", "mail_id": mail.id}
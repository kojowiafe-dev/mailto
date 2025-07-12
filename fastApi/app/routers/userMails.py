from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
import database, models, schemas

router = APIRouter(
    prefix="/usermails",
    tags=["UMails"],
    # responses={404: {"description": "Not found"}},
)


# storing user mails in the database
@router.post("/store", response_model=schemas.MailResponse, status_code=status.HTTP_201_CREATED)
async def store_user_mail(request: schemas.MailRequest, session: database.SessionLocal):
    if not request.subject or not request.email or not request.content:
        raise HTTPException(status_code=400, detail="Subject, email, and content are required")

    mail = models.Mails.model_validate(request)
    session.add(mail)
    session.commit()
    session.refresh(mail)
    
    return {"message": "Mail stored successfully", "mail_id": mail.id}
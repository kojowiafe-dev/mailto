from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
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
    
    return mail


@router.get("/store", response_model=list[schemas.MailResponse], status_code=status.HTTP_200_OK)
async def get_mails(session: database.SessionLocal):
    mails = session.exec(select(models.Mails)).all()
    return mails


@router.get("/{mail_id}", response_model=schemas.MailResponse, status_code=status.HTTP_200_OK)
async def get_mail(mail_id: int, session: database.SessionLocal):
    mail = session.get(models.Mails, mail_id)
    if not mail:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mail not found")
    return mail


@router.patch("/{mail_id}", response_model=schemas.MailResponse, status_code=status.HTTP_200_OK)
async def update_mail(mail_id: int, request: schemas.MailRequest, session: database.SessionLocal):
    mail = session.get(models.Mails, mail_id)
    if not mail:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mail not found")
    mail_data = request.dict(exclude_unset=True)
    for key, value in mail_data.items():
        setattr(mail, key, value)
    session.commit()
    session.refresh(mail)
    return mail



@router.delete("/{mail_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mail(mail_id: int, session: database.SessionLocal):
    mail = session.get(models.Mails, mail_id)
    if not mail:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mail not found")
    session.delete(mail)
    session.commit()
from fastapi import APIRouter, HTTPException, status, Depends
from email.message import EmailMessage
import smtplib
from schemas import MailRequest
from routers.authentication import get_current_user
import models

router = APIRouter(
    prefix="/ai-mail",
    tags=["AI Mail"],
    # responses={404: {"description": "Not found"}},
)

@router.post("/send")
async def send_mail(request: MailRequest, current_user: models.User = Depends(get_current_user)):
    message = EmailMessage()
    message["Subject"] = request.subject
    message["From"] = current_user.email
    message["To"] = request.email
    message.set_content(request.content)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("wiafejeremiah@gmail.com", "moid yxus tial suwd")
            server.send_message(message)
            
            return { "detail" : "Message sent successfully"}
        
        mail = models.Mails(
            subject=request.subject,
            email=request.email,
            content=request.content,
            created_at=datetime.utcnow(),
            user_id=current_user.id
        )
        
        session.add(mail)
        session.commit()
        session.refresh(mail)
        
        return mail
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f'Email not sent: {str(e)}')
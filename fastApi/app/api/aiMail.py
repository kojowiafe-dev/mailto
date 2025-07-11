from fastapi import APIRouter, HTTPException, status
from email.message import EmailMessage
import smtplib
from schemas import MailRequest

router = APIRouter(
    prefix="/ai-mail",
    tags=["AI Mail"],
    # responses={404: {"description": "Not found"}},
)

@router.post("/send")
async def send_mail(request: MailRequest):
    message = EmailMessage()
    message["Subject"] = request.subject
    message["From"] = "wiafejeremiah@gmail.com"
    message["To"] = request.email
    message.set_content(request.content)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("wiafejeremiah@gmail.com", "moid yxus tial suwd")
            server.send_message(message)
            
            return { "detail" : "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f'Email not sent: {str(e)}')
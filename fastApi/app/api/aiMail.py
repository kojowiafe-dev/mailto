# from fastapi import APIRouter, HTTPException, status, Depends
# from email.message import EmailMessage
# import smtplib
# from schemas import MailRequest
# from oauth2 import get_current_user
# import models, database
# from datetime import datetime
# from send_gmail import send_gmail_email

# router = APIRouter(
#     prefix="/ai-mail",
#     tags=["AI Mail"],
#     # responses={404: {"description": "Not found"}},
# )

# @router.post("/send")
# async def send_mail(session: database.SessionLocal, request: MailRequest, current_user: models.User = Depends(get_current_user)):
#     message = EmailMessage()
#     message["Subject"] = request.subject
#     message["From"] = current_user.email
#     message["To"] = request.email
#     message.set_content(request.content)
    
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import MailRequest
from oauth2 import get_current_user
import models, database
from datetime import datetime
from .send_gmail import send_gmail_email  # This is your Gmail API wrapper

router = APIRouter(prefix="/ai-mail", tags=["AI Mail"])

@router.post("/send")
async def send_email(
    request: MailRequest,
    session: database.SessionLocal,
    current_user: models.User = Depends(get_current_user)
):
    print(f"Sending email as: {current_user.email}")
    try:
        result = send_gmail_email(
            to_email=request.email,
            subject=request.subject,
            body=request.content,
            user_email=current_user.email
        )

        print("Email sent result:", result)

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

        return {"detail": "Mail sent and saved", "mail_id": mail.id, "google_response": result}

    except Exception as e:
        print("Error sending email:", str(e))  # <-- ADD THIS
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Email not sent: {str(e)}"
        )

from fastapi import APIRouter, Depends, HTTPException, status
from schemas import MailRequest
from oauth2 import get_current_user
import models, database
from datetime import datetime
from api.send_gmail import send_gmail_email
import os

router = APIRouter(
    # prefix="/", 
    tags=["Email Status"]
)

@router.get("/email/status")
def gmail_status(current_user: models.User = Depends(get_current_user)):
    token_path = f"tokens/{current_user.email.replace('@', '_at_')}.json"
    return {"gmail_linked": os.path.exists(token_path)}
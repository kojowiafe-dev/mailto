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
def gmail_status(user: models.User = Depends(get_current_user)):
    print("User email:", user.email)
    print("Working directory:", os.getcwd())
    safe_email = user.email.replace("@", "_at_").replace(".", "_dot_")
    token_path = f"tokens/{safe_email}.json"

    exists = os.path.exists(token_path)
    print("Token exists?", exists, "| Path:", token_path)
    return {"gmail_linked": exists}


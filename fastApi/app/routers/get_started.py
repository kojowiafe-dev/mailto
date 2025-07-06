from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel, EmailStr
from typing import List, Optional

router = APIRouter()

class GetStartedForm(BaseModel):
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

@router.post("/get-started", status_code=status.HTTP_201_CREATED)
async def submit_get_started(form: GetStartedForm, request: Request):
    # Here you can add logic to save to DB, send email, etc.
    # For now, just return the received data
    return {"message": "Form received successfully", "data": form.dict()}

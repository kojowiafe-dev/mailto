from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import schemas, database

router = APIRouter()


@router.post("/get-started", status_code=status.HTTP_201_CREATED)
async def submit_get_started(request: schemas.GetStartedForm, session: database.SessionLocal = None):
    # Here you can add logic to save to DB, send email, etc.
    # For now, just return the received data
    return {"message": "Form received successfully", "data": request.dict()}

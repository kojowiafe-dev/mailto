from fastapi import APIRouter, HTTPException, status
import models, database, schemas
from sqlmodel import select



router = APIRouter(
    tags=['Messages'],
    prefix='/message'
)


@router.get("/", response_model=list[models.Message], status_code=status.HTTP_200_OK)
async def get_messages(session: database.SessionLocal):
    messages = session.exec(select(models.Message)).all()
    return messages


@router.post("/", response_model=schemas.MessageResponse, status_code=status.HTTP_201_CREATED)
async def create_message(request: schemas.MessageCreate, session: database.SessionLocal):
    message = models.Message.model_validate(request)
    session.add(message)
    session.commit()
    session.refresh(message)
    return message


@router.get("/{message_id}", response_model=schemas.MessageResponse, status_code=status.HTTP_200_OK)
async def get_message(message_id: int, session: database.SessionLocal):
    message = session.get(models.Message, message_id)
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    return message


@router.patch("/{message_id}", response_model=schemas.MessageResponse, status_code=status.HTTP_200_OK)
async def update_message(message_id: int, request: schemas.MessageCreate, session: database.SessionLocal):
    message = session.get(models.Message, message_id)
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    message_data = request.dict(exclude_unset=True)
    for key, value in message_data.items():
        setattr(message, key, value)
    session.commit()
    session.refresh(message)
    return message



@router.delete("/message/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(message_id: int, session: database.SessionLocal):
    message = session.get(models.Message, message_id)
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    session.delete(message)
    session.commit()
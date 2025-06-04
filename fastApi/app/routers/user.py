from fastapi import APIRouter, HTTPException, status
import models, database, schemas, hashing
from sqlmodel import select

router = APIRouter(
    tags=['Users'],
    prefix='/user'
)


@router.get("/", response_model=list[models.User], status_code=status.HTTP_200_OK)
async def get_users(session: database.SessionLocal):    
    users = session.exec(select(models.User)).all()
    return users


# @router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
# async def create_user(request: schemas.UserCreate, session: database.SessionLocal):
#     # existing_user = session.query(models.User).filter(models.User.email == request.email).first()
#     # if existing_user:
#     #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User already exists')
    
#     user = models.User.model_validate(request)
#     # user = models.User(username=request.username, email=request.email, password=request.password)
#     # hashed_password = hashing.get_password_hash(request.password)
#     # user_data = request.dict()
#     # user_data['password'] = hashed_password
#     # user = models.User(**user_data)
#     session.add(user)
#     session.commit()
#     session.refresh(user)
#     return user



@router.get("/{user_id}", response_model=schemas.UserResponse, status_code=status.HTTP_200_OK)
async def get_user(user_id: int, session: database.SessionLocal):
    user = session.get(models.User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user



@router.patch("/{user_id}", response_model=schemas.UserResponse, status_code=status.HTTP_200_OK)
async def update_user(user_id: int, request: schemas.UserUpdate, session: database.SessionLocal):
    user = session.get(models.User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user_data = request.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    session.commit()
    session.refresh(user)
    return user



@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, session: database.SessionLocal):
    user = session.get(models.User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    session.delete(user)
    session.commit()
from fastapi import APIRouter, HTTPException, status
import schemas, database, models, hashing
from mail import create_verification_token, send_verification_email

router = APIRouter(
    tags= ['Register'],
    prefix='/register'
)

@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(request: schemas.UserCreate, session: database.SessionLocal):

    # checking if username is already taken
    existing_username = session.query(models.User).filter(models.User.username == request.username).first()
    if existing_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username already taken')
    
    # checking if email is taken
    existing_email = session.query(models.User).filter(models.User.email == request.email).first()
    
    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already taken')

    # user = models.User.model_validate(request)

    # user = models.User(username=request.username, email=request.email, password=request.password)
    hashed_password = hashing.get_password_hash(request.password)
    user = models.User(
        username=request.username,
        email=request.email,
        password=hashed_password,
        is_verified=False
    )
    # user_data['password'] = hashed_password
    # user = models.User(**user_data)
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create verification token and send email
    token = create_verification_token(user.email)
    await send_verification_email(user.email, token)

    
    return user
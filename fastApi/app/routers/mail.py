from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status, APIRouter, Depends
from email.message import EmailMessage
import aiosmtplib
import database, models


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


router = APIRouter(
    prefix='/',
    tags='Mail'
)


def create_verification_token(email: str):
    expire: datetime = datetime.utcnow() + timedelta(hours=24)
    payload = {"sub": email, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def send_verification_email(email: str, token: str):
    link = f"http://localhost:5173/verify-email?token={token}"
    message = EmailMessage()
    message["Subject"] = "Verify your email"
    message["From"] = "wiafejeremiah@gmail.com"
    message["To"] = email
    message.set_content(f"Click this link to verify your email: {link}")

    try:
        await aiosmtplib.send(message, hostname="smtp.gmail.com", port=587, start_tls=True, username="wiafejeremiah@gmail.com", password="KingOfGlory1$")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Email not sent')
    

@router.get('/verify-email')
def verify_email(token: str, session: database.SessionLocal):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Token")
    
        user = session.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        
        if user.is_verified:
            return {"message": "Account already verified"}
    
        user.is_verified = True
        session.commit()

        return {"message": "Email verified successfully"}
    
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")

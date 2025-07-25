from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
import token_access, database, models
from jose import jwt, JWTError
from sqlmodel import select


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != "user" or form_data.password != "pass":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid credentials")
    return {"access_token": "mytoken", "token_type": "bearer"}

@router.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    return {"message": "Access granted", "token": token}
    
    
async def read_users_me(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
    
# def get_current_user(session: database.SessionLocal, token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, token_access.SECRET_KEY, algorithms=[token_access.ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

#         user = session.exec(select(models.User).where(models.User.email == email)).first()
#         if user is None:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
#         return user

#     except JWTError:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token is invalid")
    
    

def get_current_user(session: database.SessionLocal, token: str = Depends(oauth2_scheme)):
    print("Token received:", token)  # Debugging line
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, token_access.SECRET_KEY, algorithms=[token_access.ALGORITHM])
        print("Payload:", payload)  # Debugging line
        user_id: int = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = session.exec(select(models.User).where(models.User.id == user_id)).first()

    if user is None:
        raise credentials_exception

    return user

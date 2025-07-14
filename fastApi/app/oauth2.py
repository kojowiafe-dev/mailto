from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
import token_access, database, models
from jose import jwt, JWTError
from sqlmodel import select


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

# def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"}
#     )
#     token_access.verify_access_token(token, credentials_exception)
    
    
    
async def read_users_me(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
    
def get_current_user(session: database.SessionLocal, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, token_access.SECRET_KEY, algorithms=[token_access.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = session.exec(select(models.User).where(models.User.email == email)).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid")
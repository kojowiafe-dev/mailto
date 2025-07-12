from sqlmodel import select
from fastapi import FastAPI, status, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import database, models, schemas, hashing
from routers import user, message, authentication, register, mail, get_started, userMails
from api import ai, aiMail
# from fastapi.security import OAuth2PasswordBearer

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://localhost:5173/register",
    "http://localhost:5173/login",
    "http://localhost:5173/index"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins, you can specify a list of allowed origins here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, you can specify a list of allowed methods here
    allow_headers=["*"],  # Allows all headers, you can specify a list of allowed headers here
)

app.include_router(user.router)
app.include_router(message.router)
app.include_router(authentication.router)
app.include_router(register.router)
app.include_router(mail.router)
app.include_router(get_started.router)
app.include_router(ai.router)
app.include_router(aiMail.router)
app.include_router(userMails.router)


@app.on_event("startup")
async def on_startup():
    database.create_db_and_tables()
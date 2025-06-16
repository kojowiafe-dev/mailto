from sqlmodel import select
from fastapi import FastAPI, status, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import database, models, schemas, hashing
from routers import user, message, authentication, register, mail
# from fastapi.security import OAuth2PasswordBearer

app = FastAPI()


origins = [
    "http://10.11.25.240:5173/register",
    "http://10.11.25.240:5173/login",
    "http://10.11.25.240:5173/index",
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


# @app.exception_handler(Exception)
# async def validation_exception_handler(request, exc):
#     return JSONResponse(
#         status_code=500,
#         content={"message": "Internal Server Error", "details": str(exc)},
#     )

app.include_router(user.router)
app.include_router(message.router)
app.include_router(authentication.router)
app.include_router(register.router)
app.include_router(mail.router)


@app.on_event("startup")
async def on_startup():
    database.create_db_and_tables()
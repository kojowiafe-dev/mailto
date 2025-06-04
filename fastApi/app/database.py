from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlmodel import SQLModel, Session
from typing import Annotated
from fastapi import Depends, FastAPI


sqlite_file_name = "database.db"
DATABASE_URL = f"sqlite:///{sqlite_file_name}"


# creating the engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
)

# creating the session
def get_session():    
    with Session(engine) as session:
        yield session


SessionLocal = Annotated[Session, Depends(get_session)]

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
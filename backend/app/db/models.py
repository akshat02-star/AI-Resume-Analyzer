from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Basic User Info
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    # Store hashed password only (never plain password)
    password_hash = Column(String, nullable=False)

    # User role (user / admin)
    role = Column(String, default="user")

    # Created timestamp
    created_at = Column(DateTime, default=datetime.utcnow)
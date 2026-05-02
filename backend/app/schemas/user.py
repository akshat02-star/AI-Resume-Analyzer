from pydantic import BaseModel, EmailStr
from datetime import datetime


# Request schema for user registration
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# Request schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Response schema for returning user details
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True
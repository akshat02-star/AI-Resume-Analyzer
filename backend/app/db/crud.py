from sqlalchemy.orm import Session
from app.db.models import User


# Create a new user
def create_user(db: Session, name: str, email: str, password_hash: str):
    new_user = User(
        name=name,
        email=email,
        password_hash=password_hash
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Get user by email (used during login + duplicate check)
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


# Get user by ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


# Get all users (useful later for admin panel)
def get_all_users(db: Session):
    return db.query(User).all()
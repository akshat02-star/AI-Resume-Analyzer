from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

# Secret key for JWT (later move this to .env)
SECRET_KEY = "akshat_super_secret_key"

# JWT algorithm
ALGORITHM = "HS256"

# Token expiry time (in minutes)
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 12  # 12 hours

# Password hashing setup
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# Hash plain password before saving to DB
def hash_password(password: str):
    return pwd_context.hash(password)


# Verify login password against hashed password
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


# Create JWT access token
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.routes import router as api_router
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()
app = FastAPI(title="AI Resume Analyzer")

origins = [
    "http://localhost:5173", # for local development
    "https://ai-resume-analyzer-sclr.onrender.com" # Render hosted backend server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes from the api module
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return{
        "message": "Welcome to the FastAPI resume analyzer",
        "docs": "/docs"
    }
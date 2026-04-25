from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.analyzer import analyze
from app.utils.pdf import parse_pdf
import asyncio
router = APIRouter()

ALLOWED_EXTENSIONS = {"pdf"}
ALLOWED_CONTENT_TYPE = {"application/pdf"}

# validation: format, present or not,
# TODO: FILE SIZE LIMIT
# TODO: error handling on parse_pdf
# TODO: content formatting / validation
@router.post("/analyze")
async def analyze_resume(file: UploadFile=File(...)):
    # 1. Handle case where filename is empty (field present but no file selected)
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # 2. Validate file extension
    extension = file.filename.split(".")[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File extension '.{extension}' is not supported. Please upload resume in PDF format.")

    # 3. Optional: Validate MIME type for better security
    if file.content_type not in ALLOWED_CONTENT_TYPE:
        raise HTTPException(status_code=400, detail="Invalid content type. Only PDF files are accepted.")

    # no external call in parse_pdf so parse_pdf sync
    # BUT heavy cpu work so asyncio.to_thread, otherwise blocking the async function
    content = await asyncio.to_thread(parse_pdf, file.file)
    # external call made to gemini so async needed
    analyzed_content = await analyze(content)
    return {
        "filename": file.filename,
        "message": analyzed_content
    }

@router.get("/status")
async def get_status():
    return {"status": "OK"}
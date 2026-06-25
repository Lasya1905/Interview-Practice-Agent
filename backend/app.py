from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from services.resume_parser import extract_text_from_pdf
import os
from routes.interview import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message":"Backend Running"}

@app.get("/test")
def test():
    return {"message": "Connection Successful"}

@app.post("/upload-resume")
async def upload_resume(
file: UploadFile = File(...)
):
    try:
        if not file.filename.endswith(".pdf"):
            return {
                "error": "Only PDF files are allowed."
            }

        os.makedirs("uploads", exist_ok=True)

        filepath = f"uploads/{file.filename}"

        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())

        resume_text = extract_text_from_pdf(filepath)

        if not resume_text.strip():
            return {
                "error": "No text could be extracted from the uploaded resume."
            }

        return {
            "message": "Resume uploaded successfully",
            "filename": file.filename,
            "text": resume_text
        }

    except Exception as e:
        print(f"Resume Upload Error: {e}")

        return {
            "error": "Failed to process the resume. Please upload a valid PDF."
        }


app.include_router(router)
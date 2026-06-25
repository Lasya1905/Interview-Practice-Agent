from fastapi import APIRouter
from services.llm_service import generate_question, generate_report
from services.llm_service import generate_followup
import uuid
from services.interview_service import create_session, get_session
from services.interview_service import add_interaction
from fastapi import HTTPException

router = APIRouter()

@router.post("/start-interview")
def start_interview(data: dict):

    session_id = str(uuid.uuid4())
    create_session(session_id)

    # error handling for missing keys
    if "role" not in data or "resume_text" not in data:
        raise HTTPException(status_code=400, detail="Missing required fields: 'role' and 'resume_text'.")

    role = data["role"]
    resume_text = data["resume_text"]
    company = data.get("company", "")

    question = generate_question(
        role,
        resume_text,
        company
    )

    return {
        "session_id": session_id,
        "question": question
    }

@router.post("/answer")
def submit_answer(data: dict):

    # error handling for missing keys
    if "session_id" not in data or "question" not in data or "answer" not in data:
        raise HTTPException(status_code=400, detail="Missing required fields: 'session_id', 'question', and 'answer'.")

    session_id = data["session_id"]
    question = data["question"]
    answer = data["answer"]

    add_interaction(
        session_id,
        question,
        answer
    )

    followup = generate_followup(
        question,
        answer,
        data.get("company", "")
    )

    return {
        "followup": followup
    }

@router.post("/end-interview")
def end_interview(data: dict):

    # error handling for missing keys
    if "session_id" not in data:
        raise HTTPException(status_code=400, detail="Missing required field: 'session_id'.")

    session_id = data["session_id"]

    history = get_session(session_id)

    report = generate_report(history)

    return {
        "report": report
    }
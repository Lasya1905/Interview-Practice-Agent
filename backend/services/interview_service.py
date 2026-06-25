interview_sessions = {}

def create_session(session_id):
    interview_sessions[session_id] = []

def add_interaction(session_id, question, answer):
    if session_id not in interview_sessions:
        raise ValueError(f"Session ID {session_id} does not exist.")
    interview_sessions[session_id].append({
        "question": question,
        "answer": answer
    })

def get_session(session_id):
    if session_id not in interview_sessions:
        return []

    return interview_sessions.get(session_id, [])
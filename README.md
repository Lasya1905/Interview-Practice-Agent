# AI Interview Practice Agent

An AI-powered interview practice platform that simulates real-world technical interviews using Large Language Models (LLMs). The application personalizes interview questions based on the candidate's resume, selected job role, and target company, conducts an interactive interview through voice and text, and generates a comprehensive performance report.

---

## Features

- Resume upload and PDF parsing
- Resume-based interview question generation
- Role-specific interview customization
- Company-specific interview questions
- Dynamic follow-up questions based on candidate responses
- Voice-based interaction
  - Speech-to-Text
  - Text-to-Speech
- Configurable interview duration
- Automatic interview termination
- AI-generated interview report
- Error handling and input validation

---

## Tech Stack

### Frontend

- React
- Axios
- React Markdown
- Web Speech API

### Backend

- FastAPI
- Python

### AI

- LangChain
- Groq
- Llama 3

### Resume Parsing

- PyPDF

---

## System Architecture

```text
                   +-----------------------+
                   |    React Frontend     |
                   +-----------------------+
                              |
                         Axios API Calls
                              |
                              ▼
                   +-----------------------+
                   |    FastAPI Backend    |
                   +-----------------------+
                              |
      --------------------------------------------------
      |                    |                          |
      ▼                    ▼                          ▼
 Resume Parser     Interview Manager         LangChain + Groq
                                                    |
                                                    ▼
                                              Llama 3 Model
                                                    |
              -------------------------------------------------
              |                    |                         |
              ▼                    ▼                         ▼
      Generate Question    Generate Follow-up      Generate Report
```

---

## Workflow

1. Upload a PDF resume.
2. Resume is parsed into plain text.
3. Select:
   - Job Role
   - Target Company
   - Interview Duration
4. AI generates the first interview question.
5. Candidate answers using voice or text.
6. AI generates context-aware follow-up questions.
7. Interview ends automatically after the selected duration or manually by the user.
8. AI generates a detailed performance report.

---

## Design Decisions

### Resume Parsing

The uploaded resume is converted into text before sending it to the language model. This enables personalized interview questions based on the candidate's skills, projects, and experience.

### LangChain

LangChain simplifies prompt management and LLM interaction while making the project easier to extend with memory and Retrieval-Augmented Generation (RAG) in the future.

### Groq

Groq provides low-latency inference, allowing the interview to feel conversational and responsive.

### FastAPI

FastAPI was selected because it is lightweight, high-performance, and integrates seamlessly with Python-based AI applications.

### React

React enables a component-based frontend architecture and efficient state management for interview sessions, timers, reports, and voice interaction.

---

## API Endpoints

### POST `/upload-resume`

Uploads a PDF resume and extracts text.

### POST `/start-interview`

Creates a new interview session and generates the first interview question.

### POST `/answer`

Processes the candidate's response and generates a follow-up question.

### POST `/end-interview`

Ends the interview and generates the final evaluation report.

---

## Error Handling

The application validates and handles:

- Missing resume upload
- Invalid file types
- Empty interview responses
- Missing job role
- Missing interview duration
- Backend API failures
- LLM invocation failures
- Unsupported browser speech recognition

---

## Future Enhancements

- Adaptive interview difficulty
- Webcam-based candidate presence detection
- Emotion and confidence analysis
- Retrieval-Augmented Generation (RAG) for company-specific interviews
- Persistent interview history using a database
- Multi-round interview support

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/<your-username>/Interview-Practice-Agent.git

cd Interview-Practice-Agent
```

---

### Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment.

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the backend.

```bash
uvicorn app:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Project Highlights

- Personalized AI Interview Experience
- Resume-Aware Question Generation
- Company-Specific Questions
- Dynamic Follow-up Questions
- Voice-Based Interaction
- AI-Powered Performance Evaluation

---

## Author

**Lasya Rao K**

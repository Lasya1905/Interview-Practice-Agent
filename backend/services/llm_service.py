import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile"   
)

def generate_question(role, resume_text, company):

    prompt = f"""
    You are an experienced technical interviewer.

    Candidate Role:
    {role}

    Target Company:
    {company}

    Resume:
    {resume_text}

    Instructions:
    - Ask ONLY ONE interview question.
    - The question should be concise (2-3 sentences maximum).
    - Base it on the candidate's resume, selected role, and target company.
    - Mix technical, behavioral, and company-specific questions across the interview, but ask only ONE question at a time.
    - Do NOT generate a list of questions.
    - Do NOT explain your reasoning.
    - Do NOT use headings or bullet points.

    Return only the interview question.
    """
    try:
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"Error generating interview question: {e}")
        return "Sorry, I'm having trouble generating a question right now."

def generate_followup(question, answer, company):

    prompt = f"""
    You are an experienced interviewer.

    Target Company:
    {company}

    Previous Question:
    {question}

    Candidate Answer:
    {answer}

    Instructions:
    - Ask ONLY ONE follow-up question.
    - Keep it under 2 sentences.
    - Base it on the candidate's previous answer.
    - If appropriate, relate it to expectations for {company}.
    - Do not provide feedback.
    - Do not answer the previous question.
    - Do not generate multiple questions.

    Return only the follow-up question.
    """
    try:
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"Error generating follow-up question: {e}")
        return "Sorry, I'm having trouble generating a follow-up question right now."   


def evaluate_answer(question, answer):

    prompt = f"""
    You are an experienced technical interviewer.

    Interview Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the candidate's answer based on:

    * Technical correctness
    * Completeness
    * Clarity of explanation
    * Confidence demonstrated

    Provide:

    1. Technical Score (/10)
    2. Brief Feedback (2-3 sentences)
    3. One suggestion for improvement

    Keep the evaluation concise and professional.
    """

    try:
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"Error evaluating answers: {e}")
        return "Sorry, I'm having trouble evaluating your answers right now."  


def generate_report(history):

    prompt = f"""
    You are an interview evaluator.

    Interview History:
    {history}

    Evaluate the candidate based on their interview responses, not their resume.

    Provide:

    1. Overall Score (/10)
    2. Technical Knowledge Score (/10)
    3. Communication Score (/10)
    4. Strengths
    5. Weaknesses
    6. Areas for Improvement
    7. Recommended Topics to Study

    Focus on:
    - Quality of answers
    - Depth of understanding
    - Communication clarity
    - Problem solving ability
    - Confidence

    Keep the report professional and concise.
    """
    try:
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"Error generating Report: {e}")
        return "Sorry, I'm having trouble generating Report."  

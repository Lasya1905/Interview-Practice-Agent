import { useState } from "react";
import api from "../services/api";
import './InterviewSetup.css';

function InterviewSetup({ setSessionId, setQuestion, setDuration, setCompany }) {
  const [role, setRole] = useState("");
  const [resume, setResume] = useState(null);
  const [duration, setLocalDuration] = useState("");
  const [company, setLocalCompany] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleUpload = async () => {
    if (!resume) {
        alert("Please upload a resume");
        return;
    }

    if(!resume.name.endsWith(".pdf")) {
        alert("Please upload a PDF file");
        return;
    }

    const formData = new FormData();
    formData.append("file", resume);

    try {
        const response = await api.post(
            "/upload-resume",
            formData
        );

        console.log(response.data);
        if(!response.data.text) {
            alert("Error parsing resume. Please try again.");
            return;
        }
        setResumeText(response.data.text);

        alert("Resume Parsed Successfully");

    } catch (error) {
        console.error(error);
        alert("Error uploading resume. Please try again.");
    }
    };

    const handleStartInterview = async () => {
        if (!role) {
            alert("Please select a role");
            return;
        }

        if (!resumeText) {
            alert("Please upload a resume");
            return;
        }

        if (!duration) {
            alert("Please select duration");
            return;
        }

        setDuration(duration);
        setCompany(company);

        try {
          const response = await api.post(
              "/start-interview",
              {
              role,
              resume_text: resumeText,
              company
              }
          );

          console.log(response.data);
          console.log("Start Interview Clicked");
          setSessionId(response.data.session_id);
          setQuestion(response.data.question);

        } catch (error) {
            console.error(error);
            alert("Error starting interview. Please try again.");
        }
    };

  return (
    <div className="setup-container">
      <h1>Interview Practice Agent</h1>

      <h3>Select Role</h3>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Choose Role</option>
        <option value="Software Engineer">
          Software Engineer
        </option>
        <option value="Cybersecurity">
          Cybersecurity
        </option>
        <option value="Data Analyst">
          Data Analyst
        </option>
        <option value="Student">
          Student
        </option>
      </select>

      <h3>Select Duration</h3>

      <select
        value={duration}
        onChange={(e) => setLocalDuration(e.target.value)}
      >
        <option value="">Choose Duration</option>
        <option value="5">5 Minutes</option>
        <option value="10">10 Minutes</option>
        <option value="15">15 Minutes</option>
      </select>

      <h3>Company Name (Optional)</h3>

      <input
        type="text"
        placeholder="Company Name (Optional)"
        value={company}
        onChange={(e) => setLocalCompany(e.target.value)} className="company-input"
      />

      <h3>Upload Resume</h3>

        <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
        />
        <button onClick={handleUpload} className="upload-btn">
            Upload Resume
        </button>

      <br /><br />

      <button onClick={handleStartInterview} className="start-btn">
        Start Interview
      </button>
    </div>
  );
}

export default InterviewSetup;
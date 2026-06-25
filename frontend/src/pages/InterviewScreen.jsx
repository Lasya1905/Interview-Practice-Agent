import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import "./InterviewScreen.css";

function InterviewScreen({
  sessionId,
  question,
  duration,
  company
}) {

  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [answer, setAnswer] = useState("");
  const [report, setReport] = useState("");
  const [timeLeft, setTimeLeft] = useState(Number(duration) * 60);
  const hasSpoken = useRef(false);

  const handleEndInterview = async () => {

      try {

        const response = await api.post(
        "/end-interview",
        {
            session_id: sessionId
        }
        );

        setReport(response.data.report);
      
      } catch (error) {
        alert("Error ending interview. Please try again.");
        console.error("Error ending interview:", error);
      }
    };

    const startListening = () => {
        if (
          !window.SpeechRecognition &&
          !window.webkitSpeechRecognition
        ) {
          alert("Speech recognition is not supported in this browser.");
          return;
        }

        const recognition =
            new window.webkitSpeechRecognition();

        recognition.lang = "en-US";

        recognition.onerror = () => {
          alert("Unable to access microphone.");
        };

        recognition.onresult = (event) => {

            setAnswer(
            event.results[0][0].transcript
            );

        };

        recognition.start();
    };

    const speakText = (text) => {

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";

        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {

        if (!hasSpoken.current) {
            speakText(currentQuestion);
            hasSpoken.current = true;
        }

    }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          handleEndInterview();

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const handleSubmit = async () => {

    if (!answer.trim()) {
        alert("Please provide an answer.");
        return;
    }
    
    try {

        const response = await api.post(
          "/answer",
          {
            session_id: sessionId,
            question: currentQuestion,
            answer: answer,
            company: company
          }
        );

        setCurrentQuestion(response.data.followup);
        speakText(response.data.followup);
        setAnswer("");
    } catch (error) {
        alert("Error submitting answer. Please try again.");
        console.error("Error submitting answer:", error);
      }
    };

  if (report) {
    return (
      <div className="report-container">
        <h1>Interview Report</h1>
        <ReactMarkdown>
            {report}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div>

      <h3>
        Time Left: {timeLeft}s
      </h3>

      <h2>Question</h2>

      <p>{currentQuestion}</p>

      <textarea className="answer-textbox"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={startListening}>
        🎤 Speak Answer
      </button>

      <br />

      <button onClick={startListening}>
        🎤 Speak Answer
      </button>

      <br />

      <button onClick={handleSubmit}>
        Submit Answer
      </button>

        <br />

      <button onClick={handleEndInterview}>
        End Interview
      </button>

    </div>
  );
}

export default InterviewScreen;
import { useState } from "react";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewScreen from "./pages/InterviewScreen";

function App() {

  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("");
  const [company, setCompany] = useState("");

  if(sessionId){
    return (
      <InterviewScreen
        sessionId={sessionId}
        question={question}
        duration={duration}
        company={company}
      />
    );
  }

  return (
    <InterviewSetup
      setSessionId={setSessionId}
      setQuestion={setQuestion}
      setDuration={setDuration}
      setCompany={setCompany}
    />
  );
}

export default App;
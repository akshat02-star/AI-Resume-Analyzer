import "./App.css";
import Button from './components/Button'
import Input from './components/Input'
import { useState, useRef } from 'react'

function App() {
  // const [showInput, setShowInput] = useState(false)
  // using useRef for holding the input DOM element
  // const [response, setResponse] = useState<Response | null>(null)
  const API_URL = import.meta.env.VITE_API_URL;
  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analyzedContent, setAnalyzedContent] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadClick = () => {
    console.log("upload button clicked");
    inputElementRef.current?.click();
    // setShowInput(true)
  }
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file = event.target.files?.[0];
    console.log("selected file for upload: ", selected_file);
    if(selected_file){
      setFile(selected_file);
    }
    // resetting the target value so that analyze button re-appears
    // if the same file is re-selected after analyze is clicked
    event.target.value = "";
    setAnalyzedContent("");
    setResumeContent("");
    setError("");
    // setShowInput(false)
  }
  const handleAnalyzeClick = async () => {
    setError("");
    if(!file){
      console.log("analyze button clicked but no file found.")
      return ;
    }
    console.log("analyze button clicked for file: ", file);
    const formData = new FormData();
    formData.append("file", file);
    try{
      setLoading(true);
      const response = await fetch(`${API_URL}/api/v1/analyze`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        let errorMsg = "Request Failed"
        const errorData = await response.json();
        errorMsg = errorData.detail || errorMsg;
        console.error("Backend error:", errorMsg);
        setError(errorMsg);
        return;
      }
      const data = await response.json();
      console.log("Analysis response:", data);
      // alert(data.message); // temporary for testing
      setAnalyzedContent(data.message);
      setResumeContent(data.message);
      setFile(null);
    }catch(error){
      console.error("Error while uploading file:", error);
      // setError(error.body);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong while uploading the file.");
      }
    }
    finally{
      setLoading(false);
    }
  }
  const handleClearAnalysis = () => {
    setAnalyzedContent("");
    setResumeContent("");
    setError("");
  }
  return (
    <div>
        <div className="header-section">
          <h1 className="main-title">AI Resume Analyzer</h1>
          <p className="sub-title"> Upload your resume to get instant AI-powered feedback using this resume analyzer for free !!</p>
        </div>
        <div className="upload-section">
          <h2 className="upload-title">Ready Set Go !</h2>
          <div className="upload-actions">
            <Input 
              ref={inputElementRef}
              type="file"
              content_type="application/pdf"
              onChange={handleOnChange}
            />
            <Button label="Upload Resume" onClick={handleUploadClick}/>
            <Button label={loading?"Analyzing....":"Analyze"} onClick={handleAnalyzeClick} disabled={file?false:true}/>
            <Button label="Clear Analysis" onClick={handleClearAnalysis} disabled={analyzedContent?false:true}/>
          </div>
        </div>
        <div className="result-section">
          <div className="result-card">
            <h2 className="result-title">"Resume Preview"</h2>
            <div className="result-content">
              {resumeContent || "Resume Text will appear here..."}
            </div>
          </div>
          <div className="result-card">
            <h2 className="result-title">"AI Analysis"</h2>
            <div className="result-content">
              {analyzedContent || "AI suggestions will appear here..."}
            </div>
          </div>
          <div>
            <p>Error while analyzing: {error}</p>
          </div>
        </div>
      
      {/* not using this method, using useRef instead
      {showInput && (
        <Input 
          type="file" 
          content_type="application/pdf" 
          onChange={handleOnChange}
        />
      )} */}
    </div>
  )
}

export default App

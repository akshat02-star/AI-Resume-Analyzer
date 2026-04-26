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
  const [analyzeContent, setAnalyzedContent] = useState("");
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
    setError("");
    // setShowInput(false)
  }
  const handleAnalyzeClick = async () => {
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
      setAnalyzedContent(data.message)
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
  }
  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <Button label="Upload Resume" onClick={handleUploadClick} />
      {/* not using this method, using useRef instead
      {showInput && (
        <Input 
          type="file" 
          content_type="application/pdf" 
          onChange={handleOnChange}
        />
      )} */}
      <Input 
        ref={inputElementRef}
        type="file"
        content_type="application/pdf"
        onChange={handleOnChange}
      />
      {file && (<Button label={loading?"Analyzing....":"Analyze"} onClick={handleAnalyzeClick}/>)}
      {analyzeContent && <p>{analyzeContent}</p>}
      {analyzeContent && <Button label="Clear Analysis" onClick={handleClearAnalysis}/>}
      {error && <p>"Received Error:{ error}"</p>}
    </div>
  )
}

export default App

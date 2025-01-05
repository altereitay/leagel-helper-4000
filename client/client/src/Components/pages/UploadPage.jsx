import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function UploadPage() {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState("");
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const handleUrlsChange = e =>{
    const input = e.target.value;
    const urlArray = input.split(/\r?,/).map((url) => url.trim()).filter((url) => url);
    setUrls(urlArray);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      let tempFiles = [...files];
      tempFiles.push(e.target.files[0])
      setFiles(tempFiles);
    }
  };


  const handleSubmit = async () => {
    const userid = uuidv4();
    setUserID(userid);
    localStorage.setItem("userid", userid);
    const formData = new FormData();
    if (files) {
    Array.from(files).forEach((file) => formData.append("files", file));
  }

  // Append URLs to FormData
  if (urls.length > 0) {
    urls.forEach((url) => formData.append("urls", url)); // Append each URL separately
  }

  // Append userID to FormData
  formData.append("userID", userid);

    // Send data to the server
    try {
      const response = await fetch("http://localhost:8000/context", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error uploading files or URL:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Upload Your Documents and URL</h1>
      <div>
        <label>Upload Documents:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Provide a Source URLs:</label>
        <input
          type="text"
          placeholder="enter URLs separated by commas"
          value={urls}
          onChange={handleUrlsChange}
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Continue
      </button>
    </div>
  );
}

export default UploadPage;

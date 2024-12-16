import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }
    if (url) {
      formData.append("url", url);
    }

    // Send data to the server
    try {
      const response = await fetch("http://127.0.0.1:8000/api/process-data/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Move to the chat page
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
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Provide a Source URL:</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Continue
      </button>
    </div>
  );
}

export default UploadPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./UploadPage.css";

function UploadPage() {
  const [files, setFiles] = useState(null);
  const [urls, setUrls] = useState("");
  const navigate = useNavigate();

  const handleUrlsChange = (e) => {
    const input = e.target.value;
    const urlArray = input.split(/\r?,/).map((url) => url.trim()).filter((url) => url);
    setUrls(urlArray);
  };

  const handleSubmit = async () => {
    const userID = uuidv4();
    localStorage.setItem("userid", userID);

    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }
    urls.forEach((url) => formData.append("urls", url));
    formData.append("userID", userID);

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
    <div className="upload-container">
      <h1>Upload Files and URLs</h1>
      <div className="file-upload-section">
        <div className="container">
          <div className="folder">
            <div className="front-side">
              <div className="tip"></div>
              <div className="cover"></div>
            </div>
            <div className="back-side cover"></div>
          </div>
          <label className="custom-file-upload">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            Choose Files
          </label>
        </div>
      </div>
      <div className="url-upload-section">
        <label>Provide Source URLs</label>
        <input
          type="text"
          placeholder="Enter URLs separated by commas"
          value={urls}
          onChange={handleUrlsChange}
        />
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default UploadPage;

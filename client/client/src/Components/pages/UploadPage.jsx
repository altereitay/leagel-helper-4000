import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import "./UploadPage.css";

function UploadPage() {
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState("");
    const [userID, setUserID] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // For unsupported files
    const navigate = useNavigate();

    const handleUrlsChange = (e) => {
        const input = e.target.value;
        const urlArray = input
            .split(/\r?,/)
            .map((url) => url.trim())
            .filter((url) => url);
        setUrls(urlArray);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const supportedFormats = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // PDF & DOCX MIME types
            const selectedFiles = Array.from(e.target.files);

            // Filter supported files
            const validFiles = selectedFiles.filter((file) =>
                supportedFormats.includes(file.type)
            );

            // Check for unsupported files
            const invalidFiles = selectedFiles.filter(
                (file) => !supportedFormats.includes(file.type)
            );

            if (invalidFiles.length > 0) {
                setErrorMessage(
                    "Only PDF and DOCX files are allowed. Unsupported files were ignored."
                );
            } else {
                setErrorMessage(""); // Clear error message
            }

            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
    };

    const handleSubmit = async () => {
        const userid = uuidv4();
        setUserID(userid);
        localStorage.setItem("userid", userid);
        const formData = new FormData();
        if (files) {
            files.forEach((file) => formData.append("files", file));
        }

        if (urls.length > 0) {
            urls.forEach((url) => formData.append("urls", url));
        }

        formData.append("userID", userid);

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
        <div>
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
                        className="title"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                    Choose a file
                </label>
                {/* Display error message for unsupported files */}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                {/* Display selected files */}
                <div className="file-list">
                    {files.length > 0 ? (
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No files selected yet.</p>
                    )}
                </div>
            </div>
            <div className="url-upload-section">
                <label style={{color: "#6dd5ed"}}>Provide Source URLs</label>
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

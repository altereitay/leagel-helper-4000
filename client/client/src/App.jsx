import { Routes, Route } from "react-router-dom";
import UploadPage from "./components/pages/UploadPage";
import ChatPage from "./components/pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;

import React, {useState, useEffect} from "react";
import Message from '../massages/Message.jsx'
import {useNavigate} from "react-router-dom";
import './ChatPage.css';

function ChatPage() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setUserID(localStorage.getItem("userid"));
    }, [])

    useEffect(() => {
        setMessages(messages);
    }, [messages]);

    const handleBack = () => {
        navigate("/");
    }
    const handleAsk = async () => {
        setMessages((prevMessages) => [...prevMessages, {text: question, type: 'sender'}]);
        try {
            const res = await fetch("http://localhost:8000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({question, userID: userID}),
            });
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, {text: data.msg, type: 'receiver'}]);

        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    const handleMainTopics = async () => {
        setMessages((prevMessages) => [...prevMessages, {
            text: 'show me the main topics of this conflict',
            type: 'sender'
        }]);
        try {
            const res = await fetch("http://localhost:8000/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({userID: userID})
            });
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, {text: data.msg, type: 'receiver'}]);
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    const handleMainPoints = async () => {
        setMessages((prevMessages) => [...prevMessages, {
            text: 'show me the main points of this conflict',
            type: 'sender'
        }]);
        try {
            const res = await fetch("http://localhost:8000/points", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
                , body: JSON.stringify({userID: userID})
            });
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, {text: data.msg, type: 'receiver'}]);
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    const handleSimilarities = async () => {
        setMessages((prevMessages) => [...prevMessages, {
            text: 'show me if there is similarities in the context documents',
            type: 'sender'
        }]);
        try {
            const res = await fetch("http://localhost:8000/similarities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({userID: userID})
            });
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, {text: data.msg, type: 'receiver'}]);
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };
    const handleSolution = async () => {
        setMessages((prevMessages) => [...prevMessages, {
            text: 'give me a possible solution to this conflict',
            type: 'sender'
        }]);
        try {
            const res = await fetch("http://localhost:8000/solutions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({userID: userID})
            });
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, {text: data.msg, type: 'receiver'}]);
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    return (
        <div className="chat-container">
  <h1>Ask the Chatbot</h1>
  <div className="chat-controls">
    <input
      type="text"
      placeholder="Ask a question..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button onClick={handleAsk}>Ask</button>
    <button onClick={handleMainTopics}>Show Main Topics</button>
    <button onClick={handleMainPoints}>Show Main Points</button>
    <button onClick={handleSimilarities}>Check For Similarities</button>
    <button onClick={handleSolution}>Give me a Possible Solution</button>
    <button onClick={handleBack}>Back</button>
  </div>
  <div className="chat-messages">
    {messages.map((m, index) => (
      <div key={index} className={`message ${m.type}`}>
        {m.text}
      </div>
    ))}
  </div>
</div>

    );
}

export default ChatPage;

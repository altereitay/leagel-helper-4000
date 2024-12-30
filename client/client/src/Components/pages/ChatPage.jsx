import React, {useState, useEffect} from "react";
import Message from '../massages/Message.jsx'
import {useNavigate} from "react-router-dom";

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
        <div style={{padding: "20px", textAlign: "center"}}>
            <h1>Ask the Chatbot</h1>
            <div>
                <input
                    type="text"
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={handleAsk} style={{marginLeft: "10px"}}>
                    Ask
                </button>
                <button onClick={handleMainTopics} style={{marginLeft: "10px"}}>
                    Show Main Topics
                </button>
                <button onClick={handleMainPoints} style={{marginLeft: "10px"}}>
                    Show Main Points
                </button>
                <button onClick={handleSimilarities} style={{marginLeft: "10px"}}>
                    Check For Similarities
                </button>
                <button onClick={handleSolution} style={{marginLeft: "10px"}}>
                    Give me a Possible Solution
                </button>
                <button onClick={handleBack} style={{marginLeft: "10px"}}>
                    Back
                </button>
            </div>
            <div style={{display: "flex", flexDirection: "column", margin: "20px"}}>
                {messages.map(m => <Message text={m.text} type={m.type}/>)}
            </div>
        </div>
    );
}

export default ChatPage;

import React from "react";
import "./Message.css";

const Message = ({ text, type }) => {
  return (
    <div className={`message ${type}`}>
      <div className="message-content">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;

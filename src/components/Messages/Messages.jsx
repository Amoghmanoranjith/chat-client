import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";

function Messages({ messages, name, typingUsers = [] }) {
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
  };

  useEffect(() => {
    if (isAtBottom) {
      const container = document.querySelector(".messages");
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages-container" onScroll={handleScroll}>
      <ScrollToBottom className="messages">
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(", ")} is typing...
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
      </ScrollToBottom>
      {!isAtBottom && (
        <button className="scroll-to-bottom" onClick={() => setIsAtBottom(true)}>
          Scroll to Bottom
        </button>
      )}
    </div>
  );
}

export default Messages;

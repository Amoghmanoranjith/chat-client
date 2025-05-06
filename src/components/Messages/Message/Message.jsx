import React, { useState } from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

function Message({ message: { user, text, status, reactions, timestamp }, name }) {
  const [showReactions, setShowReactions] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const availableReactions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const addReaction = (reaction) => {
    // Logic to send reaction to the server can be added here
    console.log(`Reaction added: ${reaction}`);
  };

  return (
    <div
      className={`messageContainer ${isSentByCurrentUser ? "justifyEnd" : "justifyStart"}`}
      onMouseEnter={() => { setShowReactions(true); setShowTimestamp(true); }}
      onMouseLeave={() => { setShowReactions(false); setShowTimestamp(false); }}
    >
      {isSentByCurrentUser && <p className="sentText pr-10">{trimmedName}</p>}
      <div className={`messageBox ${isSentByCurrentUser ? "backgroundBlue" : "backgroundLight"}`}>
        <p className={`messageText ${isSentByCurrentUser ? "colorWhite" : "colorDark"}`}>{ReactEmoji.emojify(text)}</p>
        {reactions && (
          <div className="reactions">
            {reactions.map((reaction, index) => (
              <span key={index} className="reaction">
                {reaction}
              </span>
            ))}
          </div>
        )}
        {isSentByCurrentUser && <span className="messageStatus">{status === "seen" ? "✓✓" : status === "delivered" ? "✓" : "..."}</span>}
        {showTimestamp && <span className="timestamp">{new Date(timestamp).toLocaleString()}</span>}
      </div>
      {!isSentByCurrentUser && <p className="sentText pl-10">{user}</p>}
      {showReactions && (
        <div className="reactionPicker">
          {availableReactions.map((reaction, index) => (
            <button
              key={index}
              className="reactionButton"
              onClick={() => addReaction(reaction)}
            >
              {reaction}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;

import React from "react";
import "./InfoBar.css";

function InfoBar({ roomId, onExit }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h1>🟢</h1>
        <h3>{roomId}</h3>
      </div>
      <div className="rightInnerContainer">
          <button onClick={onExit}>
          <h1>❌</h1>
          </button>
      </div>
    </div>
  );
}

export default InfoBar;

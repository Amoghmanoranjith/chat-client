import React from "react";
// import closeIcon from "client-chatapp/src/icons/closeIcon.png";
// import onlineIcon from "client-chatapp/src/icons/onlineIcon.png";
import "./InfoBar.css";
function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h1>🟢</h1>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <h1>❌</h1>
        </a>
      </div>
    </div>
  );
}

export default InfoBar;

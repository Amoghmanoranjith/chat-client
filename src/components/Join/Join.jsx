import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import "./Join.css";
import socket from "../socket";

function Join() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    socket.connect()
    console.log(socket.id)
    e.preventDefault();

    if (!userName || !password || !roomId) {
      setError("Please fill in all fields.");
      return;
    }
    socket.emit("join", { userName, password, roomId }, (response) => {
      if (typeof response === "string") {
        setError(response); // Display server error (like "Incorrect password")
      } else {
        // All good
        navigate(`/chat?name=${userName}&room=${roomId}`);
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>

        <input
          className="joinInput"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="joinInput mt-20"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="joinInput mt-20"
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button className="button mt-20" onClick={handleJoin}>
          Join Room
        </button>

        <p className="linkText" onClick={() => navigate("/createroom")}>
          No chat room? <span className="hover-link">Create one</span>
        </p>


        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Join;

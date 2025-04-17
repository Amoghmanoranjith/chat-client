import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "D:/Programming/wp/frontend/src/components/Join/Join.css"; // reuse existing styles

const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
const socket = io(ENDPOINT);

function CreateRoom() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!userName || !password || !roomId) {
      setError("Please fill in all fields.");
      return;
    }

    socket.emit("createRoom", { userName, password, roomId }, (response) => {
      if (typeof response === "string") {
        setError(response); // show error like "User not found" or "Room already exists"
      } else {
        navigate(`/chat?name=${userName}&room=${roomId}`);
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Create Room</h1>

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

        <button className="button mt-20" onClick={handleCreate}>
          Create Room
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}

export default CreateRoom;

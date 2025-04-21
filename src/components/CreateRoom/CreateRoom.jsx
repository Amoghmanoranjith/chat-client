import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Join/Join.css"; // reuse existing styles

const ENDPOINT = import.meta.env.VITE_BACKEND_URL;

function CreateRoom() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("")
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!roomId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ roomId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setError(data.message || "Room already exists. Try another.");
        } else if (res.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(data.message || "Unknown error occurred.");
        }
        return;
      }
      navigate(`/chat?name=${data.userName}&room=${data.roomId}&id=${data.userId}`);

    } catch (error) {
      console.error("Network error:", error);
      setError("Unable to connect to server. Please check your internet.");
    }

  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Create Room</h1>
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

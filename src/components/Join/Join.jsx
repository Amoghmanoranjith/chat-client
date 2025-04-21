import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

function Join() {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault(); // Prevent form default reload

    if (!roomId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ roomId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unknown error");
        return;
      }

      navigate(`/chat?name=${data.userName}&room=${roomId}&id=${data.userId}`);
    } catch (err) {
      setError("Server error. Try again later.");
      console.error("Join error:", err);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>

        <form onSubmit={handleJoin}>
          <input
            className="joinInput mt-20"
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <button className="button mt-20" type="submit">
            Join Room
          </button>
        </form>

        <p className="linkText" onClick={() => navigate("/createroom")}>
          No chat room? <span className="hover-link">Create one</span>
        </p>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
            {error !== "room not found" && (
              <> — <span className="hover-link-error" onClick={() => navigate("/")}>Login again</span></>
            )}
          </p>
        )}

      </div>
    </div>
  );
}

export default Join;

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoom] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { name, room, id } = queryString.parse(location.search);
    setUserName(name);
    setRoom(room);
    setUserId(id);
    socketRef.current = io(ENDPOINT, { transports: ["websocket"] });

    socketRef.current.connect();
    window.addEventListener("beforeUnload", handleRoomExit);

    socketRef.current.emit("join", { userName: name, userId: id, roomId: room }, (response) => {
      if (typeof response === "string") {
        alert("Duplicate logins are not allowed");
        navigate("/join");
        return;
      }
    });

    socketRef.current.on("joinMessage", (msg) => setMessages(msg.messages));
    socketRef.current.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    socketRef.current.on("roomDataUpdate", (msg) => setUsers(msg.users));

    return () => {
      socketRef.current.disconnect();
      window.removeEventListener("beforeUnload", handleRoomExit);
    };
  }, [ENDPOINT, location.search]);

  const handleRoomExit = () => {
    socketRef.current.emit("exit", { userName, userId, roomId });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socketRef.current.emit("sendMessage", { userName, userId, roomId, message }, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar roomId={roomId} onExit={handleRoomExit} />
        <Messages messages={messages} name={userName} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} userName={userName} />
    </div>
  );
}

export default Chat;

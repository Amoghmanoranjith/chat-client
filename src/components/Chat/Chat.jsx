import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import { io } from "socket.io-client";

function Chat() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("")
  const location = useLocation();
  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  const socketRef = useRef(null);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setUserName(name);
    setRoom(room);
    socketRef.current = io(ENDPOINT, {
      transports: ["websocket"],
    });

    // Connect the socket
    socketRef.current.connect()
    // Emit join
    socketRef.current.emit("join", { userName: name, roomId:room }, (response) => {
      if (typeof response === "string") {
        console.error("Join error:", response);
        return;
      }
      console.log("Joined room successfully.");
    });

    console.log("in chat.jsx", socketRef.current, name, room)
    const handleJoinMessage = (msg) => {
      console.log("Role assigned:", msg.role);
      setMessages(msg.messages); // ✅ correctly assign initial messages
    };

    const handleMessage = (msg) => {
      console.log("New incoming message:", messages);
      setMessages(prevMessages => [...prevMessages, msg]); // ✅ append new message
    };

    socketRef.current.on("joinMessage", handleJoinMessage);
    socketRef.current.on("message", handleMessage);

    return () => {
      socketRef.current.off("joinMessage", handleJoinMessage);
      socketRef.current.off("message", handleMessage);
    };
  }, [ENDPOINT, location.search]);


  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const timestamp = new Date(); // current time
      socketRef.current.emit("sendMessage", { userName, room, message, timestamp }, () => {
        setMessage("");
      });
    }
  };


  return (
    <div className="outerContainner">
      <div className="containner">
        <InfoBar room={room} />
        <Messages messages={messages} name={userName} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
}

export default Chat;

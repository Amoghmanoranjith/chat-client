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
  const [role, setRole] = useState("")
  const location = useLocation();
  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  const socketRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const { name, room, id } = queryString.parse(location.search);
    console.log(name, room, id)
    setUserName(name);
    setRoom(room);
    setUserId(id)
    socketRef.current = io(ENDPOINT, {
      transports: ["websocket"],
    });

    // Connect the socket
    socketRef.current.connect()
    window.addEventListener("beforeUnload", handleRoomExit)
    // Emit join
    socketRef.current.emit("join", { userName: name, userId: id, roomId: room }, (response) => {
      if (typeof response === "string") {
        console.error("Join error:", response);
        alert("Duplicate logins are not allowed")
        navigate("/join")
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

    const handleRoomData = (msg) => {
      console.log("Room data updated")
      // change the people present rn
      setUsers(msg.users)
    }


    socketRef.current.on("joinMessage", handleJoinMessage);
    socketRef.current.on("message", handleMessage);
    socketRef.current.on("roomDataUpdate", handleRoomData)
    return () => {
      socketRef.current.off("joinMessage", handleJoinMessage);
      socketRef.current.off("message", handleMessage);
      socketRef.current.off("roomDataUpdate", handleRoomData)
      window.removeEventListener('beforeUnload', handleRoomExit)
      handleRoomExit()
      socketRef.current.disconnect()
    };
  }, [ENDPOINT, location.search]);

  const handleRoomExit = () => {
    console.log("exiting")
    socketRef.current.emit("exit", { userName:userName,userId: userId, roomId: roomId }, (response) => {
      if (typeof response === "string") {
        console.error("Exit error:", response);
        return;
      }
      console.log("Exited room successfully.");
      navigate("/join")
    })
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const timestamp = new Date(); // current time
      socketRef.current.emit("sendMessage", { userName, userId, roomId, message, timestamp }, () => {
        setMessage("");
      });
    }
  };


  return (
    <div className="outerContainner">
      <div className="containner">
        <InfoBar roomId={roomId} onExit={handleRoomExit} />
        <Messages messages={messages} name={userName} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} userName = {userName} />
    </div>
  );
}

export default Chat;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import socket from "../socket";

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("")
  const location = useLocation();
  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    console.log("int chat.jsx",name)
    const handleJoinMessage = (msg) => {
      // console.log("Role assigned:", role);
      // console.log("Previous messages:", messages);
  
      // setMessages(messages);
      // optionally store role in state if needed
      console.log(msg)
    };
    socket.on("joinMessage", handleJoinMessage)

  }, [ENDPOINT, location.search]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { name, room, message }, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainner">
      <div className="containner">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
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

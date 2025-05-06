// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Register from "./components/CreateUser/CreateUser.jsx";
import CreateRoom from "./components/CreateRoom/CreateRoom.jsx";
import Login from "./components/Login/Login.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/join" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

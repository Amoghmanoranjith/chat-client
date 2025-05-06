import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import emojiImg from "../../assets/backgrounds/icons8-chatting-66.png";
import stickerImg from "../../assets/backgrounds/undraw_welcome-cats_tw36.png";
import bubbleImg from "../../assets/backgrounds/undraw_chatting_2b1g.png";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { name, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/join");
      } else {
        console.error("Invalid response from server.");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <img src={emojiImg} alt="emoji" className="bg-icon emoji" />
      <img src={stickerImg} alt="sticker" className="bg-icon sticker" />
      <img src={bubbleImg} alt="bubble" className="bg-icon bubble" />

      <form onSubmit={handleLogin} className="login-box">
        <h1 className="createHeading">Login</h1>

        <input
          className="createInput"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="createInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="createButton" type="submit">
          Login
        </button>

        <p className="linkText" onClick={() => navigate("/register")}>
          Don't have an account? <span className="hover-link">Register here</span>
        </p>
      </form>
    </div>
  );
}

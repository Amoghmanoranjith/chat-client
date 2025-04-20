import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Make sure this exists or reuse CreateUser.css

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
        console.log("Login successful!");
        navigate("/join");
      } else {
        console.log("Invalid response from server.");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed.")
      console.log(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="createOuterContainer">
        <div className="createInnerContainer">
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
            Don't have an account?{" "}
            <span className="hover-link">Register here</span>
          </p>
        </div>
      </div>
    </form>
  );
}

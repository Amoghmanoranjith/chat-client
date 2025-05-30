import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateUser.css';


export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, { name, password });
      console.log(res)
      if (res.data.success) {
        alert("User registered! You can now join a room.");
        navigate("/join");
      }
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="createOuterContainer">
        <div className="createInnerContainer">
          <h1 className="createHeading">Register</h1>

          <input
            className="createInput"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="createInput"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="createButton" type="submit" onClick={() => navigate("/")}>
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

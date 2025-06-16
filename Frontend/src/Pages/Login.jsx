import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../component/Alert";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlert({
        message: "Please enter both username and password.",
        type: "warning",
      });
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setAlert({ message: "Logged in successfully!", type: "success" });
      setTimeout(() => navigate("/createpoll"), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setAlert({ message: msg, type: "error" });
    }
  };

  return (
    <div className="form-container">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p className="form-footer">
          Don't have an account?{" "}
          <Link to="/register" className="link-button">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

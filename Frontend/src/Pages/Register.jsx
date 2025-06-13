import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      alert("Registered successfully! Go to login.");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        <p className="form-footer">
          Already have an account?{" "}
          <Link to="/login" className="link-button">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

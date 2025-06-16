import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const validatePassword = (pwd) => {
    return (
      pwd.length >= 6 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setAlert({
        message:
          "Password must be at least 6 characters with uppercase, lowercase, and number.",
        type: "warning",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      setAlert({
        message: "Registered successfully! Go to login.",
        type: "success",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
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

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePoll from "./Pages/CreatePoll.jsx";
import VotePoll from "./Pages/VotePoll.jsx";
import PollResults from "./Pages/PollResults.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx"

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="p-4">
        <Routes>
          {/* Default Route: Login Page */}
          <Route path="/" element={<Login />} />

          {/* Protected Route for Creating Poll */}
          <Route
            path="/createpoll"
            element={isLoggedIn ? <CreatePoll /> : <Navigate to="/" />}
          />

          {/* Open Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/vote/:pollId" element={<VotePoll />} />
          <Route path="/results/:pollId" element={<PollResults />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

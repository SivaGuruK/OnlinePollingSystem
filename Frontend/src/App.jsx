import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import VotePoll from "./pages/VotePoll";
import PollResults from "./pages/PollResults";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="p-4">
        <Routes>
          {/* Protected Route for Creating Poll */}
          <Route
            path="/"
            element={isLoggedIn ? <CreatePoll /> : <Navigate to="/login" />}
          />

          {/* Open Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vote/:pollId" element={<VotePoll />} />
          <Route path="/results/:pollId" element={<PollResults />} />

          {/* Redirect any unknown route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

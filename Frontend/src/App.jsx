import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePoll from "./Pages/CreatePoll";
import VotePoll from "./Pages/VotePoll";
import PollResults from "./Pages/PollResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/vote/:id" element={<VotePoll />} />
        <Route path="/results/:id" element={<PollResults />} />
      </Routes>
    </Router>
  );
}

export default App;

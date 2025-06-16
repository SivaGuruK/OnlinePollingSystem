import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";
import "./form.css";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [polls, setPolls] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios.get(`${BASE_URL}/polls`).then((res) => {
      setPolls(res.data);
    });
  }, []);

  const handleCreate = async () => {
    try {
      const data = {
        question,
        options: options
          .filter((opt) => opt.trim())
          .map((opt) => ({ text: opt })),
      };
      const res = await axios.post(`${BASE_URL}/polls`, data);
      setAlert({
        message: "Poll Created! ID: " + res.data._id,
        type: "success",
      });

    
      const updatedPolls = await axios.get("http://localhost:5000/api/polls");
      setPolls(updatedPolls.data);

    
      setQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      setAlert({ message: "Error creating poll.", type: "error" });
    }
  };

  return (
    <div className="form-container-full">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}

      <div className="form-half">
        <h2>Create a Poll</h2>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />
        ))}
        <button onClick={() => setOptions([...options, ""])}>
          + Add Option
        </button>
        <button className="submit-btn" onClick={handleCreate}>
          Create Poll
        </button>
      </div>

      <div className="poll-list-half">
        <h2>Existing Polls</h2>
        <table className="poll-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Vote</th>
              <th>Results</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => (
              <tr key={poll._id}>
                <td>{poll.question}</td>
                <td>
                  <Link to={`/vote/${poll._id}`} title="Vote">
                    🗳️
                  </Link>
                </td>
                <td>
                  <Link to={`/results/${poll._id}`} title="View Results">
                    📊
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

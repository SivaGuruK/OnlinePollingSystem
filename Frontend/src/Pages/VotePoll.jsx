import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../component/Alert";
import "./Form.css";

export default function VotePoll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/polls/${pollId}`)
      .then((res) => setPoll(res.data))
      .catch(() => setAlert({ message: "Failed to load poll", type: "error" }));
  }, [pollId]);

  const vote = async () => {
    try {
      await axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, {
        optionIndex: selected,
      });
      setAlert({ message: "Vote submitted!", type: "success" });
    } catch (err) {
      setAlert({ message: "Failed to submit vote", type: "error" });
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="form-container">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      <h2>{poll.question}</h2>
      {poll.options.map((opt, i) => (
        <div key={i}>
          <input
            type="radio"
            name="option"
            value={i}
            onChange={() => setSelected(i)}
          />
          <label>{opt.text}</label>
        </div>
      ))}
      <button className="submit-btn" onClick={vote}>
        Submit Vote
      </button>
    </div>
  );
}

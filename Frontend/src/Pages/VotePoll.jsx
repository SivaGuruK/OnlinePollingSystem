import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../component/Alert";
import "./form.css";

export default function VotePoll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
    axios
      .get(`${BASE_URL}/polls/${pollId}`)
      .then((res) => setPoll(res.data))
      .catch(() => setAlert({ message: "Failed to load poll", type: "error" }));
  }, [pollId]);

  const vote = async () => {
    if (selected === null) {
      setAlert({
        message: "Please select an option before voting.",
        type: "error",
      });
      return;
    }    
    try {
      await axios.post(`${BASE_URL}/polls/${pollId}/vote`, {
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
      <Link
        to={`/results/${poll._id}`}
        className="submit-btn"
        style={{
          marginTop: "10px",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        View Results
      </Link>
    </div>
  );
}

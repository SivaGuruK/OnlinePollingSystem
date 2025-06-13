import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";

export default function VotePoll() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/polls/${id}`)
      .then((res) => setPoll(res.data));
  }, []);

  const vote = async () => {
    await axios.post(`http://localhost:5000/api/polls/${id}/vote`, {
      optionIndex: selected,
    });
    alert("Vote submitted!");
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="form-container">
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

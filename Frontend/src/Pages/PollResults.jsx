import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./form.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PollResults() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/polls/${id}`)
      .then((res) => setPoll(res.data));
    axios
      .get(`http://localhost:5000/api/polls/${id}/results`)
      .then((res) => setResults(res.data));
  }, []);

  const data = {
    labels: results.map((opt) => opt.text),
    datasets: [
      {
        data: results.map((opt) => opt.votes),
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
      },
    ],
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>{poll.question}</h2>
      <Pie data={data} />
    </div>
  );
}

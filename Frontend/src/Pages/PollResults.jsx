import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Alert from "../component/Alert";
import "./form.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PollResults() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pollRes = await axios.get(
          `http://localhost:5000/api/polls/${pollId}`
        );
        const resultRes = await axios.get(
          `http://localhost:5000/api/polls/${pollId}/results`
        );
        setPoll(pollRes.data);
        setResults(resultRes.data);
      } catch (err) {
        setAlert({ message: "Failed to fetch poll data.", type: "error" });
      }
    };
    fetchData();
  }, [pollId]);

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
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      <h2>{poll.question}</h2>
      <Pie data={data} />
    </div>
  );
}

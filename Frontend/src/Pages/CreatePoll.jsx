import { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleCreate = async () => {
    const data = {
      question,
      options: options
        .filter((opt) => opt.trim())
        .map((opt) => ({ text: opt })),
    };
    const res = await axios.post("http://localhost:5000/api/polls", data);
    alert("Poll Created! ID: " + res.data._id);
  };

  return (
    <div className="form-container">
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
      <button onClick={() => setOptions([...options, ""])}>+ Add Option</button>
      <button className="submit-btn" onClick={handleCreate}>
        Create Poll
      </button>
    </div>
  );
}

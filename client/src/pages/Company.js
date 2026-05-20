import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

// DEFAULT DATA
const defaultData = [
  { name: "Median of Two Sorted Arrays", company: "Google", topic: "Arrays", done: false },
  { name: "Trapping Rain Water", company: "Google", topic: "Arrays", done: false },
  { name: "LRU Cache", company: "Amazon", topic: "Linked List", done: false },
  { name: "Merge Intervals", company: "Amazon", topic: "Arrays", done: false },
  { name: "Reverse Linked List", company: "Microsoft", topic: "Linked List", done: false },
  { name: "Valid Palindrome", company: "Meta", topic: "Strings", done: false }
];

function CompanyQuestions() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  // LOAD + MERGE (IMPORTANT)
  const [questions, setQuestions] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("company")) || [];

    return defaultData.map((def) => {
      const existing = stored.find(
        (s) => s.name === def.name && s.company === def.company
      );
      return existing ? existing : def;
    }).concat(
      stored.filter(
        (s) =>
          !defaultData.find(
            (d) => d.name === s.name && d.company === s.company
          )
      )
    );
  });

  const [newQuestion, setNewQuestion] = useState("");
  const [company, setCompany] = useState("Google");
  const [topic, setTopic] = useState("Arrays");

  // SAVE
  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(questions));
  }, [questions]);

  // ✅ CORRECT TOGGLE (FIXED)
  const toggleDone = (clicked) => {
    const updated = questions.map((q) => {
      if (q.name === clicked.name && q.company === clicked.company) {
        return { ...q, done: !q.done };
      }
      return q;
    });

    setQuestions(updated);
  };

  // ADD QUESTION
  const addQuestion = () => {
    if (!newQuestion) return;

    if (questions.find(q => q.name === newQuestion)) {
      alert("Already exists ⚠️");
      return;
    }

    setQuestions([
      ...questions,
      { name: newQuestion, company, topic, done: false }
    ]);

    setNewQuestion("");
    setShowForm(false);
  };

  // FILTER
  const filtered =
    filter === "All"
      ? questions
      : questions.filter((q) => q.company === filter);

  return (
    <div>
      <Sidebar />

      <div className="main">
        <h1>Company Questions</h1>
        <p>Questions asked in company interviews.</p>

        {!showForm && (
          <button className="btn" onClick={() => setShowForm(true)}>
            + Add Question
          </button>
        )}

        {showForm && (
          <div className="progress-box">
            <input
              placeholder="Question name"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #2e7d6d"
              }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <select value={company} onChange={(e) => setCompany(e.target.value)}>
                <option>Google</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Meta</option>
                <option>Flipkart</option>
              </select>

              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option>Arrays</option>
                <option>Strings</option>
                <option>Linked List</option>
                <option>Trees</option>
              </select>

              <button className="btn" onClick={addQuestion}>Add</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* FILTER BUTTONS */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["All","Google","Amazon","Microsoft","Meta","Flipkart"].map((f,i)=>(
            <div
              key={i}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                background: filter === f ? "#2e7d6d" : "#e5e7eb",
                color: filter === f ? "white" : "#374151",
                cursor: "pointer"
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* LIST */}
        <div style={{ marginTop: "20px" }}>
          {filtered.map((q, i) => (
            <div
              key={i}
              className="progress-box"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div onClick={() => toggleDone(q)} style={{ cursor: "pointer" }}>
                {q.done ? "✔" : "○"}{" "}
                <span style={{
                  textDecoration: q.done ? "line-through" : "none",
                  color: q.done ? "gray" : "black"
                }}>
                  {q.name}
                </span>
              </div>

              <div>
                {q.company} • {q.topic}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CompanyQuestions;
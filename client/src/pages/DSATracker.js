import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

function DSATracker() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  // DEFAULT PROBLEMS
  const defaultProblems = [
    { name: "Two Sum", topic: "Arrays", difficulty: "Easy", done: false },
    { name: "Best Time to Buy and Sell Stock", topic: "Arrays", difficulty: "Easy", done: false },
    { name: "Contains Duplicate", topic: "Arrays", difficulty: "Easy", done: false },
    { name: "Maximum Subarray", topic: "Arrays", difficulty: "Medium", done: false },
    { name: "Product of Array Except Self", topic: "Arrays", difficulty: "Medium", done: false },

    { name: "Valid Anagram", topic: "Strings", difficulty: "Easy", done: false },
    { name: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", done: false },
    { name: "Longest Palindromic Substring", topic: "Strings", difficulty: "Medium", done: false },

    { name: "Reverse Linked List", topic: "Linked List", difficulty: "Easy", done: false },
    { name: "Merge Two Sorted Lists", topic: "Linked List", difficulty: "Easy", done: false },
    { name: "Linked List Cycle", topic: "Linked List", difficulty: "Easy", done: false },

    { name: "Maximum Depth of Binary Tree", topic: "Trees", difficulty: "Easy", done: false },
    { name: "Number of Islands", topic: "Graphs", difficulty: "Medium", done: false },
    { name: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy", done: false }
  ];

  // LOAD + MERGE (FIXED)
  const [problems, setProblems] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("dsa")) || [];

    return defaultProblems.map((def) => {
      const existing = stored.find(
        (s) => s.name === def.name && s.topic === def.topic
      );
      return existing ? existing : def;
    }).concat(
      stored.filter(
        (s) =>
          !defaultProblems.find(
            (d) => d.name === s.name && d.topic === s.topic
          )
      )
    );
  });

  const [newProblem, setNewProblem] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");

  // SAVE
  useEffect(() => {
    localStorage.setItem("dsa", JSON.stringify(problems));
  }, [problems]);

  // ✅ CORRECT TOGGLE (FIXED)
  const toggleDone = (clickedProblem) => {
    const updated = problems.map((p) => {
      if (p.name === clickedProblem.name && p.topic === clickedProblem.topic) {
        return { ...p, done: !p.done };
      }
      return p;
    });

    setProblems(updated);
  };

  // ADD
  const addProblem = () => {
    if (!newProblem) return;

    if (problems.find(p => p.name === newProblem)) {
      alert("Already exists ⚠️");
      return;
    }

    setProblems([
      ...problems,
      { name: newProblem, topic, difficulty, done: false }
    ]);

    setNewProblem("");
    setShowForm(false);
  };

  const filteredProblems =
    filter === "All"
      ? problems
      : problems.filter((p) => p.topic === filter);

  const solvedCount = problems.filter((p) => p.done).length;

  return (
    <div>
      <Sidebar />

      <div className="main">
        <h1>DSA Tracker</h1>
        <p>{solvedCount} of {problems.length} solved</p>

        {!showForm && (
          <button className="btn" onClick={() => setShowForm(true)}>
            + Add Problem
          </button>
        )}

        {showForm && (
          <div className="progress-box">
            <input
              placeholder="Problem name"
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option>Arrays</option>
                <option>Strings</option>
                <option>Linked List</option>
                <option>Trees</option>
                <option>Graphs</option>
                <option>Dynamic Programming</option>
              </select>

              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <button className="btn" onClick={addProblem}>Add</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["All","Arrays","Strings","Linked List","Trees","Graphs","Dynamic Programming"].map((f,i)=>(
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

        <div style={{ marginTop: "20px" }}>
          {filteredProblems.map((p, i) => (
            <div
              key={i}
              className="progress-box"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div onClick={() => toggleDone(p)} style={{ cursor: "pointer" }}>
                {p.done ? "✔" : "○"}{" "}
                <span style={{ textDecoration: p.done ? "line-through" : "none" }}>
                  {p.name}
                </span>
              </div>

              <div>
                {p.topic}{" "}
                <span className={
                  p.difficulty === "Easy"
                    ? "tag-easy"
                    : p.difficulty === "Medium"
                    ? "tag-medium"
                    : "tag-hard"
                }>
                  {p.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default DSATracker;
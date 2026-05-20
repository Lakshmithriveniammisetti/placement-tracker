import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

// DEFAULT TASKS WITH CATEGORY
const defaultTasks = [
  { name: "Tell me about yourself", category: "HR", done: false },
  { name: "Strengths and Weakness", category: "HR", done: false },
  { name: "Why this company?", category: "HR", done: false }
];

function Interview() {

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("HR");
  const [filter, setFilter] = useState("All");

  const [editIndex, setEditIndex] = useState(null);

  // LOAD
  const [tasks, setTasks] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("interview")) || [];

    return defaultTasks.map((def) => {
      const existing = stored.find(s => s.name === def.name);
      return existing ? existing : def;
    }).concat(
      stored.filter(s => !defaultTasks.find(d => d.name === s.name))
    );
  });

  // SAVE
  useEffect(() => {
    localStorage.setItem("interview", JSON.stringify(tasks));
  }, [tasks]);

  // TOGGLE
  const toggle = (task) => {
    setTasks(tasks.map(t =>
      t.name === task.name ? { ...t, done: !t.done } : t
    ));
  };

  // ADD / UPDATE
  const addOrUpdateTask = () => {
    if (!newTask) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = {
        ...updated[editIndex],
        name: newTask,
        category
      };
      setTasks(updated);
      setEditIndex(null);
    } else {
      if (tasks.find(t => t.name === newTask)) {
        alert("Already exists ⚠️");
        return;
      }

      setTasks([...tasks, { name: newTask, category, done: false }]);
    }

    setNewTask("");
    setShowForm(false);
  };

  // EDIT
  const editTask = (task, index) => {
    setNewTask(task.name);
    setCategory(task.category);
    setEditIndex(index);
    setShowForm(true);
  };

  // DELETE
  const deleteTask = (task) => {
    if (!window.confirm("Delete this task?")) return;

    setTasks(tasks.filter(t => t.name !== task.name));
  };

  // FILTER
  const filtered =
    filter === "All"
      ? tasks
      : tasks.filter(t => t.category === filter);

  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div>
      <Sidebar />

      <div className="main">
        <h1>Interview Prep</h1>
        <p>{doneCount} of {tasks.length} tasks completed</p>

        {/* ADD BUTTON */}
        {!showForm && (
          <button className="btn" onClick={() => setShowForm(true)}>
            + Add Task
          </button>
        )}

        {/* FORM */}
        {showForm && (
          <div className="progress-box">
            <input
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #2e7d6d"
              }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>HR</option>
                <option>Technical</option>
                <option>Coding</option>
              </select>

              <button className="btn" onClick={addOrUpdateTask}>
                {editIndex !== null ? "Update" : "Add"}
              </button>

              <button onClick={() => {
                setShowForm(false);
                setEditIndex(null);
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* FILTER */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {["All", "HR", "Technical", "Coding"].map((f, i) => (
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
          {filtered.map((t, i) => (
            <div
              key={i}
              className="progress-box"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {/* LEFT */}
              <div onClick={() => toggle(t)} style={{ cursor: "pointer" }}>
                {t.done ? "✔" : "○"}{" "}
                <span style={{
                  textDecoration: t.done ? "line-through" : "none"
                }}>
                  {t.name}
                </span>
                <span style={{
                  marginLeft: "10px",
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  [{t.category}]
                </span>
              </div>

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => editTask(t, i)}>✏️</button>
                <button
                  onClick={() => deleteTask(t)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "6px"
                  }}
                >
                  ❌
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Interview;
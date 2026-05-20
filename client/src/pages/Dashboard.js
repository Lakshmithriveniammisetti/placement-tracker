import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

function Dashboard() {

  const [dsaData, setDsaData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [interviewData, setInterviewData] = useState([]);
  const [notesData, setNotesData] = useState([]);

  // LOAD ALL DATA
  useEffect(() => {
    setDsaData(JSON.parse(localStorage.getItem("dsa")) || []);
    setCompanyData(JSON.parse(localStorage.getItem("company")) || []);
    setInterviewData(JSON.parse(localStorage.getItem("interview")) || []);
    setNotesData(JSON.parse(localStorage.getItem("notes")) || []);
  }, []);

  // COUNTS
  const dsaSolved = dsaData.filter(p => p.done).length;
  const companySolved = companyData.filter(q => q.done).length;
  const interviewDone = interviewData.filter(t => t.done).length;

  // FIXED TOPICS
  const topicsList = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Greedy",
    "Backtracking",
    "Binary Search",
    "Heap"
  ];

  return (
    <div>
      <Sidebar />

      <div className="main">
        <h1 style={{ fontSize: "28px" }}>Dashboard</h1>
        <p style={{ color: "#6b7280" }}>
          Your placement preparation at a glance.
        </p>

        {/* ===== TOP CARDS ===== */}
        <div className="cards">

          <div className="card">
            <div className="icon-box green">{`</>`}</div>
            <div>
              <h3>DSA Problems</h3>
              <p>{dsaSolved}/{dsaData.length}</p>
              <span className="sub">solved</span>
            </div>
          </div>

          <div className="card">
            <div className="icon-box orange">📄</div>
            <div>
              <h3>Company Qs</h3>
              <p>{companySolved}/{companyData.length}</p>
              <span className="sub">solved</span>
            </div>
          </div>

          <div className="card">
            <div className="icon-box teal">✔</div>
            <div>
              <h3>Interview Prep</h3>
              <p>{interviewDone}/{interviewData.length}</p>
              <span className="sub">tasks done</span>
            </div>
          </div>

          <div className="card">
            <div className="icon-box gray">📘</div>
            <div>
              <h3>Notes</h3>
              <p>{notesData.length}</p>
              <span className="sub">saved</span>
            </div>
          </div>

        </div>

        {/* ===== TOPIC PROGRESS ===== */}
        <h3 style={{ marginTop: "30px" }}>📈 Topic Progress</h3>

        <div className="grid">
          {topicsList.map((topic, i) => {

            const total = dsaData.filter(p => p.topic === topic).length;
            const solved = dsaData.filter(p => p.topic === topic && p.done).length;

            const percent = total === 0 ? 0 : (solved / total) * 100;

            return (
              <div className="topic-card" key={i}>
                <div className="topic-head">
                  <span>{topic}</span>
                  <span>{solved}/{total}</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
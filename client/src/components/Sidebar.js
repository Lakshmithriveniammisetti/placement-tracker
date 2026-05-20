import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const loc = useLocation();
  const navigate = useNavigate();

  const active = (path) => loc.pathname === path ? "active" : "";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">   {/* ✅ SINGLE ROOT */}

      <div className="logo">💻 PrepTracker</div>

      <div className="menu">
        <Link className={active("/dashboard")} to="/dashboard">Dashboard</Link>
        <Link className={active("/dsa")} to="/dsa">DSA Tracker</Link>
        <Link className={active("/company")} to="/company">Company Questions</Link>
        <Link className={active("/notes")} to="/notes">Notes</Link>
        <Link className={active("/interview")} to="/interview">Interview Prep</Link>
      </div>

      {/* ✅ LOGOUT INSIDE SAME DIV */}
      <button
        onClick={logout}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "linear-gradient(135deg, #d82323d2, #e22727)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default Sidebar;
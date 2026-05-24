import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {

    if (!email || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {

      setLoading(true);

      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(err?.response?.data?.msg || "Login failed ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)"
    }}>

      <div style={{
        width: "400px",
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>

        <h1 style={{
          textAlign: "center",
          color: "#0f172a",
          marginBottom: "10px"
        }}>
          Placement Tracker
        </h1>

        <p style={{
          textAlign: "center",
          color: "#64748b",
          marginBottom: "30px"
        }}>
          Track Placements, DSA & Interview Prep 🚀
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            marginBottom: "20px",
            fontSize: "15px",
            outline: "none"
          }}
        />

        <div style={{
          position: "relative",
          marginBottom: "20px"
        }}>

          <input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              outline: "none"
            }}
          />

          <span
            onClick={() => setShow(!show)}
            style={{
              position: "absolute",
              right: "15px",
              top: "14px",
              cursor: "pointer"
            }}
          >
            {show ? "🙈" : "👁️"}
          </span>

        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#0f766e",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#475569"
        }}>
          New User?{" "}
          <Link
            to="/signup"
            style={{
              color: "#0f766e",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
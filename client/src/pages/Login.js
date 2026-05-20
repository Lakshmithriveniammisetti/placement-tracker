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

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // store user
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (err) {
      alert(err?.response?.data?.msg || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f3f4f6"
    }}>

      <div style={{
        width: "350px",
        padding: "30px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center" }}>Login</h2>

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        {/* PASSWORD */}
        <div style={{ position: "relative", marginTop: "15px" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <span
            onClick={() => setShow(!show)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer"
            }}
          >
            {show ? "🙈" : "👁"}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: "#2e7d6d",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP */}
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user? <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
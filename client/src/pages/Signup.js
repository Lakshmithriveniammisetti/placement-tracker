import { useState } from "react";
import axios from "axios";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {

    try {

      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${API}/api/auth/signup`,
        { email, password }
      );

      alert(res.data.msg);

    } catch (err) {
      alert(err?.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Signup</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Signup
      </button>

    </div>
  );
}

export default Signup;
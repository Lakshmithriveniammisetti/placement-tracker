import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DSATracker from "./pages/DSATracker";
import Company from "./pages/Company";
import Notes from "./pages/Notes";
import Interview from "./pages/Interview";

function App() {
  const isAuth = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dsa" element={<DSATracker />} />
        <Route path="/company" element={<Company />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/interview" element={<Interview />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
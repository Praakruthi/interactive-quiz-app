// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("✅ Registration successful! Please log in.");
        nav("/"); // Redirect to login page
      } else {
        alert(`⚠️ ${data.message || "Registration failed"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Network error — backend not reachable!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ color: "#0a3d62" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>

        <p style={{ marginTop: "12px" }}>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

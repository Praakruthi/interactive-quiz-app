import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = { email, password };

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log("Response:", data); // 🔍 debug

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Login successful!");
      nav("/domains");
    } else {
      alert(data.message || "❌ Login failed");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Network error — backend not reachable!");
  }
};


  return (
    <div className="container">
      <div className="card">
        <h2 style={{color:"#0a3d62"}}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/>
          <button className="button" type="submit">Login</button>
        </form>
        <p style={{marginTop:12}}>Don't have account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

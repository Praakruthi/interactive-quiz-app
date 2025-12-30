import React from "react";
import { useNavigate } from "react-router-dom";

export default function DomainPage(){
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div
        className="card"
        style={{
          width: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          position: "relative",
        }}
      >
        {/* Top Bar with Title and Logout */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ color: "#0a3d62", margin: 0 }}>Choose Domain</h3>
          <button
            className="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              alert("Logged out");
              navigate("/");
            }}
            style={{
              background: "#e74c3c",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Domain Buttons */}
        {["Indian History", "Sports", "GK", "Cinema"].map((domain) => (
          <button
            key={domain}
            className="button"
            style={{
              width: "100%",
              background: "#0a3d62",
              color: "white",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "10px",
            }}
            onClick={() => navigate(`/quiz/${domain}`)}
          >
            {domain}
          </button>
        ))}

        <button
          className="button"
          onClick={() => navigate("/records")}
          style={{
            marginTop: "15px",
            width: "100%",
            background: "#003366",
            color: "white",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          View My Records
        </button>
      </div>
    </div>
  );
  }

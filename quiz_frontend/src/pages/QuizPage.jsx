// pages/QuizPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { domain } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(Array(15).fill(null));
  const [timeSpent, setTimeSpent] = useState(Array(15).fill(0));
  const [time, setTime] = useState(0); // cumulative time spent on current question

  const timerRef = useRef(null);
  const timeStartRef = useRef(Date.now()); // track when current question session started

  // 🔹 Fetch questions
  useEffect(() => {
    const fetchQ = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/questions/${encodeURIComponent(domain)}`);
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          alert("No questions found for this domain.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load questions");
      }
    };
    fetchQ();
  }, [domain]);

  // 🕒 Initialize timer to continue from previous time when revisiting a question
  useEffect(() => {
    if (questions.length > 0) {
      // Start time for this question from its accumulated timeSpent
      setTime(timeSpent[index]);
      timeStartRef.current = Date.now();
    }
  }, [index, questions]);

  // 🕒 Timer logic — start fresh for each question
  useEffect(() => {
    if (!questions.length) return;

    // Clear any previous timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start timer that counts UP from current accumulated time
    timerRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [index, questions]);

  const handleAutoNext = (curTime) => {
    // Save current time spent before moving
    setTimeSpent(prev => {
      const copy = [...prev];
      copy[index] = time;
      return copy;
    });

    if (index < questions.length - 1) {
      setIndex(i => i + 1);
    } else {
      handleSubmit(); // auto-submit if last question
    }
  };

  // ✅ Record answer
  const handleAnswer = (optIndex) => {
    setSelected(prev => {
      const copy = [...prev];
      copy[index] = optIndex;
      return copy;
    });
  };

  // ✅ Next question
  const handleNext = () => {
    setTimeSpent(prev => {
      const copy = [...prev];
      copy[index] = time;
      return copy;
    });
    setIndex(i => Math.min(i + 1, questions.length - 1));
  };

  // ✅ Previous question
  const handlePrev = () => {
    if (index > 0) {
      setTimeSpent(prev => {
        const copy = [...prev];
        copy[index] = time; // save current question's time
        return copy;
      });
      setIndex(i => i - 1);
    }
  };

  // ✅ Submit quiz
  const handleSubmit = async () => {
    const finalTimeSpent = [...timeSpent];
    finalTimeSpent[index] = time;

    let score = 0;
    questions.forEach((q, i) => {
      if (selected[i] !== null && q.correctAnswer === q.options[selected[i]]) {
        score++;
      }
    });

    const totals = questions.length;
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:5000/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ domain, score, total: totals, timeSpent: finalTimeSpent }),
        });
      }
    } catch (e) {
      console.error("Save score failed", e);
    }

    localStorage.setItem("lastResult", JSON.stringify({ domain, score, total: totals, timeSpent: finalTimeSpent }));
    navigate("/result");
  };

  if (!questions.length)
    return (
      <div className="container">
        <div className="card">Loading...</div>
      </div>
    );

  const q = questions[index];
  const progressPercent = Math.round(((index + 1) / questions.length) * 100);
  const remaining = time;

  return (
    <div className="container">
      <div className="card" style={{ width: 700 }}>
        <h3 style={{ color: "#0a3d62" }}>
          {domain} — Question {index + 1} / {questions.length}
        </h3>
        <p style={{ fontWeight: 600 }}>{q.question}</p>

        <div>
          {q.options.map((opt, oi) => (
            <div key={oi} style={{ margin: "8px 0" }}>
              <button
                onClick={() => handleAnswer(oi)}
                className="button"
                style={{
                  background: selected[index] === oi ? "#1e5fa1" : "#f0f4ff",
                  color: selected[index] === oi ? "#fff" : "#000",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {opt}
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <div>
            <button onClick={handlePrev} className="button" style={{ background: "#aaa" }} disabled={index === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              className="button"
              style={{ marginLeft: 8 }}
              disabled={index === questions.length - 1}
            >
              Next
            </button>
          </div>

          <div style={{ textAlign: "right" }}>
            <div>Time spent on this question: <strong>{remaining}s</strong></div>
            <div style={{ marginTop: 8 }}>
              Progress:
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
          <div>
            <button className="button" onClick={() => navigate("/domains")} style={{ marginRight: 8 }}>
              Back to Domains
            </button>
            <button className="button" onClick={handleSubmit}>Submit Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
}


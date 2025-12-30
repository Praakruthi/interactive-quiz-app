// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // ✅ added
import DomainPage from "./pages/DomainPage";
import RecordsPage from "./pages/RecordsPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ added */}
        <Route path="/domains" element={<DomainPage />} />
        <Route path="/quiz/:domain" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/records" element={<RecordsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

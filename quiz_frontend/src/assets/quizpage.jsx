import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const navigate = useNavigate();

  return (
    <div className="page quiz-page">
      <div className="card">
        <h2>Quiz Page</h2>
        <p>Question will appear here...</p>

        <div className="quiz-controls">
          <button>Previous</button>
          <button>Next</button>
          <button onClick={() => navigate('/result')}>Submit</button>
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: '20%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;

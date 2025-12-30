import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="page result-page">
      <div className="card">
        <h2>Result Page</h2>
        <p>Your score: 12/15</p>

        <table>
          <thead>
            <tr>
              <th>Q.No</th>
              <th>Time (s)</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{(Math.random() * 10).toFixed(2)}</td>
                <td>{Math.random() > 0.5 ? 1 : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => navigate('/domains')}>Back to Domain Page</button>
      </div>
    </div>
  );
}

export default ResultPage;

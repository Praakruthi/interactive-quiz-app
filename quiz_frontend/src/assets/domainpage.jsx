import { useNavigate } from 'react-router-dom';

function DomainPage() {
  const navigate = useNavigate();
  const domains = ['Indian History', 'Sports', 'GK', 'Cinema'];

  return (
    <div className="page domain-page">
      <div className="card">
        <h2>Choose Your Domain</h2>
        <div className="button-group">
          {domains.map((domain, i) => (
            <button
              key={i}
              onClick={() =>
                navigate(`/quiz/${domain.toLowerCase().replace(/ /g, '-')}`)
              }
            >
              {domain}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DomainPage;

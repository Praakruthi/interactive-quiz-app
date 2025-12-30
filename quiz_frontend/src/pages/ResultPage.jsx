import React from "react";

export default function ResultPage(){
  const last = JSON.parse(localStorage.getItem('lastResult') || '{}');
  if (!last || !last.domain) return (<div className="container"><div className="card">No result</div></div>);
  return (
    <div className="container">
      <div className="card">
        <h2 style={{color:'#0a3d62'}}>Result</h2>
        <p>Your score: {last.score}/{last.total}</p>
        <table className="table">
          <thead>
            <tr><th>Q.No</th><th>Time (s)</th><th>Marks</th></tr>
          </thead>
          <tbody>
            {(Array.isArray(last.timeSpent) ? last.timeSpent : Array(last.total).fill(0)).map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t || 0}</td>
                <td>{i < (last.score || 0) ? "1" : "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:12}}>
          <a href="/domains" className="button">Back to Domains</a>
        </div>
      </div>
    </div>
  );
}

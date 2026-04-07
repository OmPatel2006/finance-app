import { useState } from 'react';

function Savings({ goals, addGoal, removeGoal, updateGoal }) {
  const [contrib, setContrib] = useState(null);
  const [contribAmt, setContribAmt] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const target = parseFloat(e.target.target.value);
    const saved = parseFloat(e.target.saved.value || 0);
    if (!name || !target) return;
    addGoal({ name, target, saved });
    e.target.reset();
  };

  const handleContrib = (e) => {
    e.preventDefault();
    const amt = parseFloat(contribAmt);
    if (!amt) return;
    const goal = goals.find(g => g.id === contrib);
    updateGoal(contrib, Math.min(goal.saved + amt, goal.target));
    setContrib(null);
    setContribAmt('');
  };

  const COLORS = ['#6ee7b7', '#60a5fa', '#f472b6', '#fb923c', '#a78bfa', '#facc15'];

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Savings Goals</h2>
      <p className="total-label" style={{ marginBottom: 20 }}>Track progress toward your goals</p>

      <form className="form-card" onSubmit={handleAddGoal}>
        <input className="input" name="name" placeholder="Goal name (e.g. Vacation)" />
        <input className="input" name="target" placeholder="Target amount (e.g. 2000)" type="number" step="0.01" />
        <input className="input" name="saved" placeholder="Already saved (e.g. 500) — optional" type="number" step="0.01" />
        <button type="submit" className="btn-add">+ Add Goal</button>
      </form>

      {goals.length === 0 ? (
        <p className="empty">No goals yet. Add one above!</p>
      ) : (
        <div className="goals-grid">
          {goals.map((g, i) => {
            const pct = Math.min((g.saved / g.target) * 100, 100);
            const color = COLORS[i % COLORS.length];
            const done = pct >= 100;
            const circumference = 2 * Math.PI * 36;
            const strokeDash = (pct / 100) * circumference;
            return (
              <div key={g.id} className="goal-card">
                <div className="goal-top">
                  <div className="goal-name">{g.name}</div>
                  {done && <span style={{ fontSize: 18 }}>🎉</span>}
                  <button className="btn-delete" onClick={() => removeGoal(g.id)}>🗑</button>
                </div>
                <div className="goal-ring-wrap">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#1e1e1e" strokeWidth="8" />
                    <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="goal-pct" style={{ color }}>{pct.toFixed(0)}%</div>
                </div>
                <div className="goal-amounts">
                  <span style={{ color: '#aaa', fontFamily: 'monospace', fontSize: 13 }}>
                    ${g.saved.toFixed(2)} / ${g.target.toFixed(2)}
                  </span>
                </div>
                {!done && (
                  contrib === g.id ? (
                    <form onSubmit={handleContrib} style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <input className="input" placeholder="Amount" type="number" step="0.01"
                        value={contribAmt} onChange={e => setContribAmt(e.target.value)} style={{ flex: 1 }} />
                      <button type="submit" className="btn-add" style={{ width: 'auto', padding: '0 14px' }}>✓</button>
                      <button type="button" onClick={() => setContrib(null)}
                        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', borderRadius: 10, padding: '0 12px', cursor: 'pointer' }}>✕</button>
                    </form>
                  ) : (
                    <button className="btn-add" style={{ marginTop: 10, background: color, color: '#000' }}
                      onClick={() => setContrib(g.id)}>
                      + Add Funds
                    </button>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Savings;
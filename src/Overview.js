function Overview({ expenses, incomes, budgets, goals }) {
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const net = totalIncome - totalExpenses;
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);

  // Group expenses by category
  const catMap = {};
  expenses.forEach(e => {
    catMap[e.category] = (catMap[e.category] || 0) + e.amount;
  });
  const topCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCat = topCats[0]?.[1] || 1;

  const CAT_COLORS = {
    Food: '#fb923c', Housing: '#f472b6', Transport: '#60a5fa',
    Health: '#34d399', Entertainment: '#a78bfa', Shopping: '#facc15',
    Utilities: '#38bdf8', Other: '#94a3b8',
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Overview</h2>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card" style={{ borderColor: net >= 0 ? '#6ee7b744' : '#f8717144' }}>
          <div className="stat-label">Net Balance</div>
          <div className="stat-value" style={{ color: net >= 0 ? '#6ee7b7' : '#f87171' }}>
            ${Math.abs(net).toFixed(2)}
          </div>
          <div className="stat-sub" style={{ color: net >= 0 ? '#6ee7b7' : '#f87171' }}>
            {net >= 0 ? '▲ In the green' : '▼ Overspent'}
          </div>
        </div>

        <div className="stat-card" style={{ borderColor: '#6ee7b744' }}>
          <div className="stat-label">Total Income</div>
          <div className="stat-value" style={{ color: '#6ee7b7' }}>${totalIncome.toFixed(2)}</div>
          <div className="stat-sub">{incomes.length} entries</div>
        </div>

        <div className="stat-card" style={{ borderColor: '#f8717144' }}>
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value" style={{ color: '#f87171' }}>${totalExpenses.toFixed(2)}</div>
          <div className="stat-sub">{expenses.length} entries</div>
        </div>

        <div className="stat-card" style={{ borderColor: '#60a5fa44' }}>
          <div className="stat-label">Total Saved</div>
          <div className="stat-value" style={{ color: '#60a5fa' }}>${totalSaved.toFixed(2)}</div>
          <div className="stat-sub">{goals.length} active goals</div>
        </div>
      </div>

      {/* Top Spending */}
      {topCats.length > 0 && (
        <div className="overview-card">
          <div className="overview-card-title">Top Spending Categories</div>
          {topCats.map(([cat, amt]) => (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: CAT_COLORS[cat] || '#94a3b8' }}>{cat}</span>
                <span style={{ color: '#aaa', fontFamily: 'monospace' }}>${amt.toFixed(2)}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{
                  width: `${(amt / maxCat) * 100}%`,
                  background: CAT_COLORS[cat] || '#94a3b8',
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Expenses */}
      {expenses.length > 0 && (
        <div className="overview-card">
          <div className="overview-card-title">Recent Expenses</div>
          {expenses.slice(0, 5).map(e => (
            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #141414' }}>
              <div>
                <div style={{ fontSize: 13, color: '#e0e0e0' }}>{e.desc}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{e.category} · {e.date}</div>
              </div>
              <div style={{ color: '#f87171', fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>
                -${e.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {expenses.length === 0 && incomes.length === 0 && (
        <div style={{ textAlign: 'center', color: '#444', padding: '60px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
          <div style={{ fontSize: 14 }}>Add some income or expenses to see your overview.</div>
        </div>
      )}
    </div>
  );
}

export default Overview;
const CATEGORIES = ['Food', 'Housing', 'Transport', 'Health', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

function Budget({ expenses, budgets, addBudget, removeBudget }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const limit = parseFloat(e.target.limit.value);
    if (!limit) return;
    addBudget({ category, limit });
    e.target.reset();
  };

  const spentOn = (category) =>
    expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Budget</h2>
      <p className="total-label" style={{ marginBottom: 20 }}>Set monthly limits per category</p>

      <form className="form-card" onSubmit={handleSubmit}>
        <select className="input" name="category">
          {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        <input className="input" name="limit" placeholder="Monthly limit (e.g. 500)" type="number" step="0.01" />
        <button type="submit" className="btn-add">+ Set Budget</button>
      </form>

      {budgets.length === 0 ? (
        <p className="empty">No budgets set yet. Add one above!</p>
      ) : (
        <div className="expense-list">
          {budgets.map(b => {
            const spent = spentOn(b.category);
            const pct = Math.min((spent / b.limit) * 100, 100);
            const over = spent > b.limit;
            return (
              <div key={b.id} className="expense-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="expense-desc">{b.category}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: '#aaa', fontFamily: 'monospace' }}>
                      ${spent.toFixed(2)} / ${b.limit.toFixed(2)}
                    </span>
                    {over && <span style={{ fontSize: 11, color: '#f87171', fontWeight: 700 }}>OVER</span>}
                    <button className="btn-delete" onClick={() => removeBudget(b.id)}>🗑</button>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: over ? '#f87171' : '#6ee7b7' }} />
                </div>
                <div style={{ fontSize: 11, color: '#555' }}>
                  {pct.toFixed(0)}% used · ${Math.max(b.limit - spent, 0).toFixed(2)} remaining
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Budget;
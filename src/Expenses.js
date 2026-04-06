const CATEGORIES = ['Food', 'Housing', 'Transport', 'Health', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

function Expenses({ expenses, setExpenses }) {
  const addExpense = (e) => {
    e.preventDefault();
    const desc = e.target.desc.value;
    const amount = e.target.amount.value;
    const category = e.target.category.value;
    if (!desc || !amount) return;
    const newExpense = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
    };
    setExpenses([newExpense, ...expenses]);
    e.target.reset();
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Expenses</h2>
          <p className="total-label">
            Total: <span className="total-amount">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={addExpense}>
        <input className="input" name="desc" placeholder="Description (e.g. Coffee)" />
        <input className="input" name="amount" placeholder="Amount (e.g. 4.50)" type="number" step="0.01" />
        <select className="input" name="category">
          {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
        <button type="submit" className="btn-add">+ Add Expense</button>
      </form>

      {expenses.length === 0 ? (
        <p className="empty">No expenses yet. Add one above!</p>
      ) : (
        <div className="expense-list">
          {expenses.map((e) => (
            <div key={e.id} className="expense-item">
              <div>
                <div className="expense-desc">{e.desc}</div>
                <div className="expense-meta">{e.category} · {e.date}</div>
              </div>
              <div className="expense-right">
                <div className="expense-amount">-${e.amount.toFixed(2)}</div>
                <button className="btn-delete" onClick={() => removeExpense(e.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Expenses;
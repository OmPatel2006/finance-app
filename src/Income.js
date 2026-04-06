const INCOME_TYPES = ['Salary', 'Freelance', 'Investment', 'Rental', 'Gift', 'Other'];

function Income({ incomes, setIncomes }) {
  const addIncome = (e) => {
    e.preventDefault();
    const desc = e.target.desc.value;
    const amount = e.target.amount.value;
    const type = e.target.type.value;
    if (!desc || !amount) return;
    const newIncome = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString(),
    };
    setIncomes([newIncome, ...incomes]);
    e.target.reset();
  };

  const removeIncome = (id) => {
    setIncomes(incomes.filter((i) => i.id !== id));
  };

  const total = incomes.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Income</h2>
          <p className="total-label">
            Total: <span className="total-income">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={addIncome}>
        <input className="input" name="desc" placeholder="Description (e.g. Monthly Salary)" />
        <input className="input" name="amount" placeholder="Amount (e.g. 3000)" type="number" step="0.01" />
        <select className="input" name="type">
          {INCOME_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <button type="submit" className="btn-income">+ Add Income</button>
      </form>

      {incomes.length === 0 ? (
        <p className="empty">No income added yet. Add one above!</p>
      ) : (
        <div className="expense-list">
          {incomes.map((i) => (
            <div key={i.id} className="expense-item">
              <div>
                <div className="expense-desc">{i.desc}</div>
                <div className="expense-meta">{i.type} · {i.date}</div>
              </div>
              <div className="expense-right">
                <div className="income-amount">+${i.amount.toFixed(2)}</div>
                <button className="btn-delete" onClick={() => removeIncome(i.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Income;
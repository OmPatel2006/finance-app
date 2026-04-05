import { useState } from 'react';

const CATEGORIES = ['Food', 'Housing', 'Transport', 'Health', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const addExpense = () => {
    if (!desc || !amount) return;
    const newExpense = {
      id: Date.now(),
      desc: desc,
      amount: parseFloat(amount),
      category: category,
      date: new Date().toLocaleDateString(),
    };
    setExpenses([newExpense, ...expenses]);
    setDesc('');
    setAmount('');
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

      <div className="form-card">
        <input
          className="input"
          placeholder="Description (e.g. Coffee)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          className="input"
          placeholder="Amount (e.g. 4.50)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button className="btn-add" onClick={addExpense}>
          + Add Expense
        </button>
      </div>

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
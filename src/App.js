import { useState } from 'react';
import './App.css';
import Expenses from './Expenses';
import Income from './Income';
import Budget from './Budget';

const TABS = ['Overview', 'Expenses', 'Budget', 'Savings', 'Income'];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);

  return (
    <div className="app">
      <div className="header">
        <div className="logo">FinanceOS</div>
        <div className="tagline">Your personal finance manager</div>
      </div>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'Overview' && <p style={{color:'#555'}}>Overview coming soon...</p>}
        {activeTab === 'Expenses' && <Expenses expenses={expenses} setExpenses={setExpenses} />}
        {activeTab === 'Budget' && <Budget expenses={expenses} budgets={budgets} setBudgets={setBudgets} />}
        {activeTab === 'Savings' && <p style={{color:'#555'}}>Savings coming soon...</p>}
        {activeTab === 'Income' && <Income incomes={incomes} setIncomes={setIncomes} />}
      </div>
    </div>
  );
}

export default App;
import { useState } from 'react';
import './App.css';
import Expenses from './Expenses';

const TABS = ['Overview', 'Expenses', 'Budget', 'Savings', 'Income'];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

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
        {activeTab === 'Expenses' && <Expenses />}
        {activeTab === 'Budget' && <p style={{color:'#555'}}>Budget coming soon...</p>}
        {activeTab === 'Savings' && <p style={{color:'#555'}}>Savings coming soon...</p>}
        {activeTab === 'Income' && <p style={{color:'#555'}}>Income coming soon...</p>}
      </div>
    </div>
  );
}

export default App;
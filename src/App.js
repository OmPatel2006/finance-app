import { useState, useEffect } from 'react';
import './App.css';
import Expenses from './Expenses';
import Income from './Income';
import Budget from './Budget';
import Savings from './Savings';
import Overview from './Overview';
import Login from './Login';
import { db, auth } from './firebase';
import {
  collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, where
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const TABS = ['Overview', 'Expenses', 'Budget', 'Savings', 'Income'];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Load data when user logs in
  useEffect(() => {
    if (!user) return;

    const q = (col) => query(collection(db, col), where('uid', '==', user.uid));

    const unsubExpenses = onSnapshot(q('expenses'), (snap) =>
      setExpenses(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const unsubIncomes = onSnapshot(q('incomes'), (snap) =>
      setIncomes(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const unsubBudgets = onSnapshot(q('budgets'), (snap) =>
      setBudgets(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const unsubGoals = onSnapshot(q('goals'), (snap) =>
      setGoals(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => {
      unsubExpenses();
      unsubIncomes();
      unsubBudgets();
      unsubGoals();
    };
  }, [user]);

  // Expenses
  const addExpense = (expense) => addDoc(collection(db, 'expenses'), { ...expense, uid: user.uid });
  const removeExpense = (id) => deleteDoc(doc(db, 'expenses', id));

  // Incomes
  const addIncome = (income) => addDoc(collection(db, 'incomes'), { ...income, uid: user.uid });
  const removeIncome = (id) => deleteDoc(doc(db, 'incomes', id));

  // Budgets
  const addBudget = (budget) => addDoc(collection(db, 'budgets'), { ...budget, uid: user.uid });
  const removeBudget = (id) => deleteDoc(doc(db, 'budgets', id));

  // Goals
  const addGoal = (goal) => addDoc(collection(db, 'goals'), { ...goal, uid: user.uid });
  const removeGoal = (id) => deleteDoc(doc(db, 'goals', id));
  const updateGoal = (id, saved) => updateDoc(doc(db, 'goals', id), { saved });

  const handleLogout = () => signOut(auth);

  if (loading) return (
    <div style={{ background: '#080808', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontFamily: 'sans-serif' }}>
      Loading...
    </div>
  );

  if (!user) return <Login />;

  return (
    <div className="app">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="logo">FinanceOS</div>
          <div className="tagline">Your personal finance manager</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={user.photoURL} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #2a2a2a',
            color: '#888', borderRadius: 8, padding: '6px 12px',
            fontSize: 12, cursor: 'pointer',
          }}>Logout</button>
        </div>
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
        {activeTab === 'Overview' && <Overview expenses={expenses} incomes={incomes} budgets={budgets} goals={goals} />}
        {activeTab === 'Expenses' && <Expenses expenses={expenses} addExpense={addExpense} removeExpense={removeExpense} />}
        {activeTab === 'Budget' && <Budget expenses={expenses} budgets={budgets} addBudget={addBudget} removeBudget={removeBudget} />}
        {activeTab === 'Savings' && <Savings goals={goals} addGoal={addGoal} removeGoal={removeGoal} updateGoal={updateGoal} />}
        {activeTab === 'Income' && <Income incomes={incomes} addIncome={addIncome} removeIncome={removeIncome} />}
      </div>
    </div>
  );
}

export default App;
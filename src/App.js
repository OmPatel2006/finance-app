import { useState, useEffect } from 'react';
import './App.css';
import Expenses from './Expenses';
import Income from './Income';
import Budget from './Budget';
import Savings from './Savings';
import Overview from './Overview';
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

const TABS = ['Overview', 'Expenses', 'Budget', 'Savings', 'Income'];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);

  // Load expenses from Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'expenses'), (snapshot) => {
      setExpenses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Load incomes from Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'incomes'), (snapshot) => {
      setIncomes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Load budgets from Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'budgets'), (snapshot) => {
      setBudgets(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Load goals from Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'goals'), (snapshot) => {
      setGoals(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Expenses
  const addExpense = async (expense) => {
    await addDoc(collection(db, 'expenses'), expense);
  };
  const removeExpense = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  // Incomes
  const addIncome = async (income) => {
    await addDoc(collection(db, 'incomes'), income);
  };
  const removeIncome = async (id) => {
    await deleteDoc(doc(db, 'incomes', id));
  };

  // Budgets
  const addBudget = async (budget) => {
    await addDoc(collection(db, 'budgets'), budget);
  };
  const removeBudget = async (id) => {
    await deleteDoc(doc(db, 'budgets', id));
  };

  // Goals
  const addGoal = async (goal) => {
    await addDoc(collection(db, 'goals'), goal);
  };
  const removeGoal = async (id) => {
    await deleteDoc(doc(db, 'goals', id));
  };
  const updateGoal = async (id, saved) => {
    const { updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'goals', id), { saved });
  };

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
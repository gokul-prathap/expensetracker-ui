import logo from './logo.svg';
import './App.css';
import ExpenseForm from './components/Expenseform/ExpenseForm';
import ExpenseTable from './components/ExpenseTable/ExpenseTable';
import { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    price: '123',
    category: 'recharge',
    description: 'mobile recharge',
    paymentMethod: 'gpay'
  });



  const data = [
    { ...formData }
  ];

  return (
    <div>
      <ExpenseForm />,
      <ExpenseTable data={data}></ExpenseTable>
    </div>
  );
}

export default App;

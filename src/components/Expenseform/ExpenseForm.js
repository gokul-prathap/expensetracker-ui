import React, { useState, useEffect } from 'react';
import styles from './ExpenseForm.module.css'; // Assuming you have CSS modules

const ExpenseForm = ({ onSave, editExpense }) => {
  const [formData, setFormData] = useState({
    category: '',
    price: '',
    description: '',
    date: '',
    paymentMethod: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editExpense) {
      setFormData(editExpense);
    }
  }, [editExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (value) => {
    setFormData({
      ...formData,
      price: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const updatedFormData = {
      ...formData,
      date: new Date(formData.date).toISOString().split('T')[0], // Ensure date is in YYYY-MM-DD format
      lastModified: new Date().toISOString()
    };
    try {
      const success = await onSave(updatedFormData);
      if (success) {
        alert('Expense saved successfully!');
        // Clear the form
        setFormData({
          category: '',
          price: '',
          description: '',
          date: '',
          paymentMethod: '',
        });
      } else {
        alert('Failed to save expense');
      }
    } catch (error) {
      alert('Failed to save expense');
    } finally {
      setLoading(false);
    }
    console.log(updatedFormData); // For now, just log the form data
  };

  const categories = ['Food', 'Recharge', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Rent', 'Healthcare', 'Education', 'Insurance', 'Travel', 'Groceries', 'Dining Out', 'Fitness', 'Personal Care', 'Household Supplies', 'Gifts & Donations', 'Subscriptions', 'Internet', 'Mobile', 'Electricity', 'Water', 'Gas', 'Maintenance', 'Loan Payments', 'Taxes', 'Investments', 'Savings', 'Miscellaneous'];

  const paymentMethods = [
    'gPay', 'Cash', 'Credit Card', 'Airtel Money', 'Amazon Pay', 'BHIM', 'Cred', 'Debit Card', 'Freecharge', 'JioMoney', 'Mobikwik', 'Online Banking', 'Ola Money', 'Paytm', 'PhonePe', 'pay Later', 'PayZapp', 'UPI', 'Utilities', 'Yono'
  ];

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Expense Tracker</h1>
        <div className={styles.form}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={styles.form}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
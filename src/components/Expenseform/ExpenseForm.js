import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';
import CurrencyInput from 'react-currency-input-field';
import { saveExpense } from '../../services/expenseService';
import CategoryManager from '../CategoryManager/CategoryManager';
import ExpandableDropdown from '../ExpandableDropdown/ExpandableDropdown';

function ExpenseForm() {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        price: '',
        category: '',
        description: '',
        paymentMethod: '',
        lastModified: new Date().toISOString()
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const updatedFormData = {
            ...formData,
            lastModified: new Date().toISOString()
        };
        try {
            await saveExpense(updatedFormData);
            alert('Expense saved successfully!');
        } catch (error) {
            alert('Failed to save expense');
        } finally {
            setLoading(false);
        }
        console.log(updatedFormData); // For now, just log the form data
    };

    const categories = ['Food', 'Recharge', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Rent', 'Healthcare', 'Education', 'Insurance', 'Travel', 'Groceries', 'Dining Out', 'Fitness', 'Personal Care', 'Household Supplies', 'Gifts & Donations', 'Subscriptions', 'Internet', 'Mobile', 'Electricity', 'Water', 'Gas', 'Maintenance', 'Loan Payments', 'Taxes', 'Investments', 'Savings', 'Miscellaneous'];

    const paymentMethods = [
        'gPay','Cash', 'Credit Card', 'Airtel Money', 'Amazon Pay', 'BHIM', 'Cred', 'Debit Card', 'Freecharge', 'JioMoney', 'Mobikwik', 'Online Banking', 'Ola Money', 'Paytm', 'PhonePe', 'pay Later', 'PayZapp', 'UPI', 'Utilities', 'Yono'
      ];
      

    return (
        <form onSubmit={handleSubmit}>
            <h1>Expense Tracker</h1>
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
                <label htmlFor="price">Price:</label>
                <CurrencyInput
                    id="price-input"
                    name="price"
                    required
                    placeholder="how much was the expense ?"
                    prefix="₹"
                    decimalsLimit={2}
                    value={formData.price.formatted}
                    onChange={handleChange}
                    onValueChange={(value, name, values) => {
                        console.log(value, name, values);
                    }}
                />
            </div>
            <div className={styles.form}>
                {/* <CategoryManager></CategoryManager> */}
                <select
                    className={styles.form}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}

                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <div className={styles.form}>
                <select
                    className={styles.form}
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}

                    required
                >
                    <option value="">Select Payment Method</option>
                    {paymentMethods.map((paymentMethod) => (
                        <option key={paymentMethod} value={paymentMethod}>
                            {paymentMethod}
                        </option>
                    ))}
                </select>


            </div>


            </div>
            <div className={styles.form}>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Expense'}
            </button>
        </form>
    );
}

export default ExpenseForm;
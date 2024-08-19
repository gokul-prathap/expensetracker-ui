import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';
import CurrencyInput from 'react-currency-input-field';
import CategoryManager from '../CategoryManager/CategoryManager';
import ExpandableDropdown from '../ExpandableDropdown/ExpandableDropdown';

function ExpenseForm() {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        price: '',
        category: '',
        description: '',
        paymentMethod: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formData); // For now, just log the form data
    };

    const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities'];

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
            <button type="submit">Submit</button>
        </form>
    );
}

export default ExpenseForm;
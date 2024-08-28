// src/services/expenseService.js
// const API_URL = 'http://localhost:8080/api'; 
const API_URL = process.env.REACT_APP_API_URL || 'https://expensetracker-api-gokul-prathap-gokuls-projects-772978f1.vercel.app/api';
export const getAllExpenses = async () => {
  try {
    console.log('API URL: ',API_URL)
    const response = await fetch(`${API_URL}/expenses`,{
      headers: {
        'Authorization': 'iSYgAYVt8924RZAs4zDdg48n', // Your authorization token
      },
      method: 'GET',
      mode: 'no-cors',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const saveExpense = async (expenseData) => {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Authorization':'iSYgAYVt8924RZAs4zDdg48n',
      },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

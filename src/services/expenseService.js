
import axios from 'axios';

const bearer_token = 'iSYgAYVt8924RZAs4zDdg48n';
const bearer = `Bearer ${bearer_token}`;
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = process.env.REACT_APP_API_URL || 'https://expensetracker-api-gokul-prathap-gokuls-projects-772978f1.vercel.app/api';
// const API_URL = 'http://localhost:8080/api';
const headers = {
  Authorization: bearer,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'

}

export const getAllExpenses = async () => {
  try {
    console.log('API URL:', API_URL);
    console.log(process.env.REACT_APP_API_URL)
    const response = await axios.get(`${API_URL}/expenses/getAllExpenses`, {
      headers: headers,
      // mode:'no-cors',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const saveExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, expenseData, {
      headers: {
        Authorization: bearer,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

// expenseService.js

// const API_URL = 'your_api_url'; // Replace with your API URL

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/expenses/deleteExpense/${id}`, {
      headers: {
        Authorization: bearer,
      },
    });
    console.log('Deleting...', id);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};
// // src/services/expenseService.js
// // const API_URL = 'http://localhost:8080/api'; 

// const bearer_token = 'iSYgAYVt8924RZAs4zDdg48n';
// const bearer = 'Bearer '+ bearer_token;
// const API_URL = process.env.REACT_APP_API_URL || 'https://expensetracker-api-gokul-prathap-gokuls-projects-772978f1.vercel.app/api';
// export const getAllExpenses = async () => {
//   try {
//     console.log('API URL: ',API_URL)
//     const response = await fetch(`${API_URL}/expenses`,{
//       headers: {
//         'Authorization': bearer, // Your authorization token
//       },
//       method: 'GET',
//       withCredentials: true,
//       credentials: 'include',
//       mode: 'no-cors',
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching expenses:', error);
//     throw error;
//   }
// };

// export const saveExpense = async (expenseData) => {
//   try {
//     const response = await fetch(`${API_URL}/submit`, {
//       method: 'POST',
//       headers: {
//         'Authorization':'Bearer iSYgAYVt8924RZAs4zDdg48n',
//       },
//       mode: 'no-cors',
//       body: JSON.stringify(expenseData)
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error saving expense:', error);
//     throw error;
//   }
// };

import axios from 'axios';

const bearer_token = 'iSYgAYVt8924RZAs4zDdg48n';
const bearer = `Bearer ${bearer_token}`;
const API_URL = process.env.REACT_APP_API_URL || 'https://cors-anywhere.herokuapp.com/https://expensetracker-api-gokul-prathap-gokuls-projects-772978f1.vercel.app/api';
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
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: headers,
      mode:'no-cors',
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

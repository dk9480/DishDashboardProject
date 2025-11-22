// frontend/src/api/dishApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/dishes'; 

export const fetchAllDishes = async () => {
    // Task 2: Fetch the list of dishes from the database 
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch dishes.', error);
        throw error;
    }
};

export const toggleDishStatus = async (dishId) => {
    // Task 2: Toggle the 'isPublished' status of a dish 
    try {
        const response = await axios.post(`${API_BASE_URL}/toggle/${dishId}`);
        return response.data;
    } catch (error) {
        console.error(`API Error: Failed to toggle dish ${dishId}.`, error);
        throw error;
    }
};
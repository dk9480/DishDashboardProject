// frontend/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import DishList from './components/DishList';
import { fetchAllDishes, toggleDishStatus } from './api/dishApi';
import { useRealTime } from './hooks/useRealTime';
import './App.css'; 

function App() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to update state based on received dish data
    const updateDishState = useCallback((updatedDishData) => {
        setDishes(prevDishes =>
            prevDishes.map(dish => 
                dish.dishId === updatedDishData.dishId 
                    ? { ...dish, isPublished: updatedDishData.isPublished } 
                    : dish
            )
        );
    }, []);

    // Connect real-time updates to the state
    useRealTime(updateDishState);


    // Initial data fetching
    useEffect(() => {
        const loadDishes = async () => {
            try {
                const data = await fetchAllDishes();
                setDishes(data);
            } catch (error) {
                // API error already logged in dishApi.js
            } finally {
                setLoading(false);
            }
        };

        loadDishes();
    }, []);


    // Handler for the toggle button click
    const handleToggle = async (dishId) => {
        try {
            // Optimistic UI update (optional, but good practice)
            updateDishState({ dishId, isPublished: !dishes.find(d => d.dishId === dishId).isPublished });
            
            // Call API (updates DB and triggers the real-time socket event)
            await toggleDishStatus(dishId);

        } catch (error) {
            console.error('Toggle failed. Reverting state...');
            // Re-fetch data if API fails to ensure state consistency
            fetchAllDishes().then(setDishes);
        }
    };

    // --- Render ---
    return (
        <div className="container">
            <h1>🍜 Dish Publishing Dashboard (React.js)</h1>
            {loading ? (
                <p>Loading dishes...</p>
            ) : (
                <DishList dishes={dishes} onToggle={handleToggle} />
            )}
        </div>
    );
}

export default App;
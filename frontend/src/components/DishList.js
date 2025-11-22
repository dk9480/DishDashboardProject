// frontend/src/components/DishList.js
import React from 'react';
import DishCard from './DishCard';

const DishList = ({ dishes, onToggle }) => {
    // Display all dishes with their information [cite: 18]
    return (
        <div className="dish-grid">
            {dishes.map(dish => (
                <DishCard 
                    key={dish.dishId} 
                    dish={dish} 
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default DishList;
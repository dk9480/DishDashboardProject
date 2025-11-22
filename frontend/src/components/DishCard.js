// frontend/src/components/DishCard.js
import React from 'react';

const DishCard = ({ dish, onToggle }) => {
    const { dishId, dishName, imageUrl, isPublished } = dish;

    return (
        <div className="dish-card">
            <img src={imageUrl} alt={dishName} className="dish-image" />
            <div className="dish-details">
                <h2>{dishName}</h2>
                <p>
                    Status: 
                    <span className={isPublished ? 'published-status' : 'unpublished-status'}>
                        {isPublished ? ' Published' : ' Unpublished'}
                    </span>
                </p>
                {/* Include a button to toggle the published status, updating both the UI and backend [cite: 19] */}
                <button 
                    onClick={() => onToggle(dishId)}
                    className={isPublished ? 'btn-unpublish' : 'btn-publish'}
                >
                    {isPublished ? 'Click to Unpublish' : 'Click to Publish'}
                </button>
            </div>
        </div>
    );
};

export default DishCard;
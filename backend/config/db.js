// backend/config/db.js
const mongoose = require('mongoose');
const Dish = require('../models/Dish');
const initialDishes = require('../dish-assignment.json');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);

        // Populate the DB if empty (Task 1)
        const count = await Dish.countDocuments();
        if (count === 0) {
            const dishesToInsert = initialDishes.map(d => ({ 
                ...d, 
                // Ensure dishId is parsed to an integer 
                dishId: parseInt(d.dishId) 
            }));
            await Dish.insertMany(dishesToInsert);
            console.log('✅ Database populated with initial dish data.');
        }

    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        // Exit process with failure
        process.exit(1); 
    }
};

module.exports = connectDB;
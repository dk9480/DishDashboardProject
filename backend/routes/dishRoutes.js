// backend/routes/dishRoutes.js
const express = require('express');
const Dish = require('../models/Dish');

// Export a function that accepts the Socket.IO instance
module.exports = (io) => {
    const router = express.Router();

    // GET /api/dishes (Task 2: Fetch all dishes)
    router.get('/', async (req, res) => {
        try {
            const dishes = await Dish.find().sort({ dishId: 1 });
            res.json(dishes);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching dishes.' });
        }
    });

    // POST /api/dishes/toggle/:dishId (Task 2: Toggle status)
    router.post('/toggle/:dishId', async (req, res) => {
        try {
            const dishId = parseInt(req.params.dishId);
            const dish = await Dish.findOne({ dishId });
            
            if (!dish) return res.status(404).json({ message: 'Dish not found' });

            // Toggle the status
            dish.isPublished = !dish.isPublished;
            await dish.save();

            // Real-Time Update (Bonus/Task 4)
            // Emit the change to all connected clients
            io.emit('dishUpdate', {
                dishId: dish.dishId,
                isPublished: dish.isPublished
            });
            
            res.json(dish);

        } catch (err) {
            res.status(500).json({ message: 'Error toggling dish status.' });
        }
    });

    return router;
};
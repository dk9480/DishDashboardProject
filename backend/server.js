// backend/server.js
const express = require('express');
const http  = require('http'); // Ensure this line is corrected from previous error
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose'); // 💡 Ensure Mongoose is imported here
require('dotenv').config();

// Custom imports for modularity
const connectDB = require('./config/db');
const dishRoutes = require('./routes/dishRoutes');
const Dish = require('./models/Dish'); // 💡 Import Dish model for Change Stream

// --- Initialization ---
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Connect to Database (Task 1)
connectDB(); 

// --- Socket.IO Setup ---
const io = new Server(server, { 
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"] 
    } 
});
console.log('✅ Socket.IO initialized.');

// --- MongoDB Change Stream (Implementation of Bonus Requirement) ---
// This listens for direct changes to the MongoDB collection (e.g., via Compass/Shell)
mongoose.connection.once('open', () => {
    console.log('🔗 Database connection open. Setting up Change Stream...');
    
    // Create a Change Stream on the 'dishes' collection
    const changeStream = Dish.watch();

    changeStream.on('change', async (change) => {
        // Only trigger on actual updates or replacements
        if (change.operationType === 'update' || change.operationType === 'replace') {
            const documentId = change.documentKey._id;
            
            // Fetch the updated document to get the new 'isPublished' status
            const updatedDish = await Dish.findById(documentId);
            
            if (updatedDish) {
                 // Emit Real-Time Update: Pushes the change to the frontend
                io.emit('dishUpdate', {
                    dishId: updatedDish.dishId,
                    isPublished: updatedDish.isPublished
                });
                console.log(`📣 Change Stream detected external change for Dish ID ${updatedDish.dishId}. Emitting update.`);
            }
        }
    });
});
// ---------------------------------------------------------------------

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Mount Routes ---
app.use('/api/dishes', dishRoutes(io)); 


// --- Start Server ---
server.listen(PORT, () => console.log(`🚀 Backend Server running on http://localhost:${PORT}`));
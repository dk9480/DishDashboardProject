# 🍽️ Dish Publishing Dashboard (MERN + Real-Time)

A full-stack application for managing dish publication status, built using the **MERN stack** with **real-time updates** powered by **Socket.IO** and **MongoDB Change Streams**.

---

## 🚀 Objective

The goal of this project is to create a dashboard that allows users to toggle the `isPublished` status of dishes and demonstrates advanced real-time synchronization.  
Changes update instantly—even when modified **directly in the database**.

---

## 🛠️ Technology Stack

| Category        | Technology               | Purpose                                                                 |
|-----------------|---------------------------|-------------------------------------------------------------------------|
| Frontend        | React.js                 | Dashboard UI, state management, API interaction                        |
| Backend         | Node.js                  | Runtime environment                                                     |
| Server          | Express.js               | RESTful API development                                                 |
| Database        | MongoDB (Mongoose)       | Data storage + automatic initial population                            |
| Real-Time       | Socket.IO                | Bi-directional communication for instant UI updates                     |
| Database Sync   | MongoDB Change Streams   | Detects direct DB edits and syncs with the server                       |

---

## 📂 Project Structure

```
DishDashboardProject/
├── backend/
│   ├── .env                   # Configuration variables (DB URI, PORT)
│   ├── config/db.js           # MongoDB connection + initial data population
│   ├── models/Dish.js         # Mongoose Schema
│   ├── routes/dishRoutes.js   # API routes + Socket.IO emissions
│   └── server.js              # Main server setup + Change Stream logic
└── frontend/
    ├── src/
    │   ├── api/dishApi.js       # Centralized Axios API service
    │   ├── hooks/useRealTime.js # Custom Socket.IO hook
    │   └── components/          # UI components (DishCard, DishList)
```




---

### Final Dashboard
<img width="1919" height="658" alt="image" src="https://github.com/user-attachments/assets/584f1ea4-a3e7-4c86-8f29-d8e3dfee7a44" />


## ⚙️ Setup and Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally (`mongodb://localhost:27017`)

---

## ⚙️ Setup and Installation

### 2. Configure Backend

Navigate to the backend folder and install dependencies:

```
cd backend
npm install
```

Create a `.env` file inside the backend folder and add your **MongoDB Atlas URI**:

```
MONGO_URI=your-atlas-connection-string
PORT=5000
```

> Example (replace `<password>` and `<dbname>`):

```
MONGO_URI=mongodb+srv://yourUser:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

---

### 3. Configure Frontend

```
cd ../frontend
npm install
```

---

## ▶️ How to Run the Application

Run backend and frontend in **separate terminals**.

---

### 1. Start Backend

In `/backend`:

```
node server.js
```

Console will confirm:

- Connected to MongoDB Atlas  
- Initial data population  
- Socket.IO initialization  

---

### 2. Start Frontend

In `/frontend`:

```
npm start
```

App opens at:

```
http://localhost:3000
```

---

## 📌 Key Features and API Endpoints

| Feature                 | Endpoint / Logic                                           | Description                                    |
| ----------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| Fetch All Dishes        | `GET /api/dishes`                                          | Returns full dish list sorted by `dishId`      |
| Toggle Publish Status   | `POST /api/dishes/toggle/:dishId`                          | Toggles `isPublished` in database              |
| Real-Time Sync (Client) | Socket.IO (`io.emit('dishUpdate')` inside `dishRoutes.js`) | Updates all connected dashboards instantly     |
| DB Direct Sync (Bonus)  | MongoDB Change Stream (`server.js`)                        | Updates dashboard when DB is modified manually |

---

## 📎 Additional Notes

- Real-time syncing ensures all open dashboards reflect changes live.  
- MongoDB Change Streams work with **Atlas** (Free Tier + Dedicated Cluster).  
- Ensure your Atlas cluster has **Change Streams enabled** (MongoDB 4.0+).

---

## ✔️ Completed and Maintained By

**DK Vijendra Kumar**


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


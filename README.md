# 🚀 LogiEdge Billing System

A full-stack billing system built using React, Node.js, Express, and MySQL.

---

## ✨ Features

- 👤 Customer Management
- 📦 Item Management
- 🧾 Billing System with GST logic
- 📊 Dashboard
- 📄 Invoice Generation

---

## 🛠️ Tech Stack

- Frontend: React + Material UI
- Backend: Node.js + Express
- Database: MySQL

---

## 📁 Project Structure

logiedge-project/
├── src/
├── server/
├── database.sql

---

## ⚙️ Setup Instructions

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ALISAJID02/LogiEdge-Project.git
cd logiedge-project
```

2️⃣ Setup Database
Open XAMPP / MySQL Workbench
Create database:
CREATE DATABASE logiedge;

Import:
database.sql

3️⃣ Setup Backend
cd server
npm install

👉 Create .env file:

MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=logiedge
MYSQLPORT=3306
PORT=5000

👉 Start backend:

npm start

4️⃣ Setup Frontend

npm install
npm start

🌐 API Endpoints
/api/customers
/api/items
/api/bills

📌 Notes
Make sure MySQL is running
Default DB config works with XAMPP

Author
Sajid Ali

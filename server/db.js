const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "logiedge",
  port: process.env.MYSQLPORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Error:", err.message);
  } else {
    console.log("✅ Database Connected ");
  }
});

module.exports = db;
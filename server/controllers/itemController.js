const db = require("../db");

exports.addItem = (req, res) => {
  const { name, price, is_active } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const sql = `
    INSERT INTO items (name, price, is_active)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, price, is_active], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Item added successfully",
      id: result.insertId,
    });
  });
};

exports.getItems = (req, res) => {
  const sql = "SELECT * FROM items ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(result);
  });
};
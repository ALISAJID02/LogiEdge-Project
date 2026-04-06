const db = require("../db");
exports.addCustomer = (req, res) => {
  const { name, address, pan, gst_number, is_active } = req.body;
  if (!name || !address || !pan) {
    return res.status(400).json({
      message: "Name, Address and PAN are required",
    });
  }

  const sql = `
    INSERT INTO customers (name, address, pan, gst_number, is_active)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, address, pan, gst_number || null, is_active],
    (err, result) => {
      if (err) {
        console.log("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
        });
      }
      res.status(201).json({
        message: "Customer added successfully",
        id: result.insertId,
      });
    }
  );
};

exports.getCustomers = (req, res) => {
  const sql = "SELECT * FROM customers ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.status(200).json(result);
  });
};
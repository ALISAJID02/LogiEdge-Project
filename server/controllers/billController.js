const db = require("../db");

exports.createBill = (req, res) => {
  const { customer_id, items, subtotal, gst, total } = req.body;
  const billSql = `
    INSERT INTO bills (customer_id, subtotal, gst, total)
    VALUES (?, ?, ?, ?)
  `;
  db.query(billSql, [customer_id, subtotal, gst, total], (err, result) => {
    if (err) return res.status(500).json(err);
    const billId = result.insertId;
    const itemSql = `
      INSERT INTO bill_items (bill_id, item_id, qty, price)
      VALUES ?
    `;
    const values = items.map((item) => [
      billId,
      item.item_id,
      item.qty,
      item.price,
    ]);
    db.query(itemSql, [values], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({ message: "Bill created successfully" });
    });
  });
};

exports.getBills = (req, res) => {
  const sql = `
    SELECT b.*, c.name as customer_name
    FROM bills b
    JOIN customers c ON b.customer_id = c.id
    ORDER BY b.id DESC
  `;
  db.query(sql, (err, bills) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }

    if (!bills.length) return res.json([]);

    const billIds = bills.map((b) => b.id);
    const itemSql = `
      SELECT bi.*, i.name as item_name
      FROM bill_items bi
      JOIN items i ON bi.item_id = i.id
      WHERE bi.bill_id IN (?)
    `;
    db.query(itemSql, [billIds], (err2, items) => {
      if (err2) return res.json([]);

      const final = bills.map((bill) => ({
        ...bill,
        items: items.filter((i) => i.bill_id === bill.id),
      }));

      res.json(final);
    });
  });
};
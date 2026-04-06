const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const itemRoutes = require("./routes/itemRoutes");
const billRoutes = require("./routes/billRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bills", billRoutes);

app.get("/", (req, res) => {
  res.send("LogiEdge Backend Running ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const billRoutes = require("./routes/billRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bills", billRoutes);

app.listen(5000, () => {
  console.log("server is running on http://localhost:5000");
});
console.log(customerRoutes);
console.log(itemRoutes);
import { useEffect, useState } from "react";
import { Box, Card, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getCustomers, getItems, getBills } from "../services/api";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [bills, setBills] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const c = await getCustomers();
    const i = await getItems();
    const b = await getBills();

    setCustomers(c || []);
    setItems(i || []);
    setBills(b || []);
  };

  const activeCustomers = customers.filter((c) => c.is_active).length;
  const activeItems = items.filter((i) => i.is_active).length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ p: 3, borderRadius: "16px" }}>
          <Typography>Total Customers</Typography>
          <Typography variant="h4" fontWeight="bold">
            {customers.length}
          </Typography>
          <Chip label={`${activeCustomers} Active`} color="success" />
        </Card>

        <Card sx={{ p: 3, borderRadius: "16px" }}>
          <Typography>Total Items</Typography>
          <Typography variant="h4" fontWeight="bold">
            {items.length}
          </Typography>
          <Chip label={`${activeItems} Active`} color="success" />
        </Card>

        <Card sx={{ p: 3, borderRadius: "16px" }}>
          <Typography>Total Bills</Typography>
          <Typography variant="h4" fontWeight="bold">
            {bills.length}
          </Typography>
          <Chip label="Generated" color="primary" />
        </Card>
      </Box>

      {/* ⚡ Quick Actions */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button variant="contained" onClick={() => navigate("/add-customer")}>
          + Add Customer
        </Button>

        <Button variant="contained" onClick={() => navigate("/add-item")}>
          + Add Item
        </Button>

        <Button variant="outlined" onClick={() => navigate("/billing")}>
          Create Bill
        </Button>
      </Box>

      <Typography variant="h6" mb={2}>
        Recent Bills
      </Typography>

      {bills.slice(0, 3).map((bill) => (
        <Card
          key={bill.id}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontWeight="bold">Invoice #{bill.id}</Typography>
            <Typography>{bill.customer_name || "Customer"}</Typography>
          </Box>

          <Box textAlign="right">
            <Typography fontWeight="bold">₹ {Number(bill.total)}</Typography>
            <Typography variant="caption">
              {new Date(bill.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Card>
      ))}

      {bills.length === 0 && <Typography>No bills generated yet</Typography>}
    </Box>
  );
};

export default Dashboard;

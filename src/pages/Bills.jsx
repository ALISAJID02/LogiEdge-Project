import { useEffect, useState } from "react";
import { Box, Card, Typography, Button, Divider } from "@mui/material";
import { getBills } from "../services/api";

const Bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const data = await getBills();
      setBills(data || []);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Bills / Invoices
      </Typography>

      {bills.length === 0 && <Typography>No bills found</Typography>}

      {bills.map((bill) => (
        <Card
          key={bill.id}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "16px",
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Invoice #{bill.id}</Typography>

            <Typography>
              {bill.created_at
                ? new Date(bill.created_at).toLocaleDateString()
                : ""}
            </Typography>
          </Box>

          <Typography mt={1}>
            Customer: <b>{bill.customer_name || "N/A"}</b>
          </Typography>

          <Divider sx={{ my: 2 }} />

          {(bill.items || []).map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>
                {item.item_name} (x{item.qty})
              </Typography>

              <Typography>₹ {Number(item.price) * item.qty}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "right" }}>
            <Typography>Subtotal: ₹ {Number(bill.subtotal)}</Typography>

            {Number(bill.gst) > 0 && (
              <Typography color="orange">GST: ₹ {Number(bill.gst)}</Typography>
            )}

            <Typography variant="h6">Total: ₹ {Number(bill.total)}</Typography>
          </Box>

          <Button variant="outlined" sx={{ mt: 2 }}>
            Print Invoice
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default Bills;

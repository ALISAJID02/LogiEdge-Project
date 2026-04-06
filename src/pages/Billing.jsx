import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Card,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { createBill, getCustomers, getItems } from "../services/api";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const c = await getCustomers();
    const i = await getItems();
    setCustomers(c || []);
    setItems(i || []);
  };

  const addItemRow = () => {
    setSelectedItems([...selectedItems, { item_id: "", qty: 1, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...selectedItems];

    if (field === "item_id") {
      const selected = items.find((i) => i.id === value);
      updated[index].item_id = value;
      updated[index].price = selected.price;
    } else {
      updated[index][field] = value;
    }

    setSelectedItems(updated);
  };

  const changeQty = (index, type) => {
    const updated = [...selectedItems];
    if (type === "inc") updated[index].qty += 1;
    if (type === "dec" && updated[index].qty > 1) updated[index].qty -= 1;
    setSelectedItems(updated);
  };

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const hasGST = selectedCustomer?.gst_number;
  const gst = hasGST ? 0 : subtotal * 0.18;
  const total = subtotal + gst;

  const handleGenerateBill = async () => {
    if (!selectedCustomer || selectedItems.length === 0) {
      alert("Select customer and items");
      return;
    }

    await createBill({
      customer_id: selectedCustomer.id,
      items: selectedItems,
      subtotal,
      gst,
      total,
    });

    navigate("/bills");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Create Invoice
      </Typography>

      <Card
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          boxShadow: 3,
        }}
      >
        <Typography fontWeight="600" mb={2}>
          Select Customer
        </Typography>

        <TextField
          select
          fullWidth
          onChange={(e) => {
            const customer = customers.find((c) => c.id === e.target.value);
            setSelectedCustomer(customer);
          }}
        >
          {customers.map((c) => (
            <MenuItem key={c.id} value={c.id} disabled={!c.is_active}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {c.name}
                <Chip
                  size="small"
                  label={c.is_active ? "Active" : "Inactive"}
                  sx={{
                    backgroundColor: c.is_active ? "#e6f4ea" : "#fdecea",
                    color: c.is_active ? "green" : "red",
                  }}
                />
              </Box>
            </MenuItem>
          ))}
        </TextField>
      </Card>

      <Card sx={{ p: 3, borderRadius: "16px", boxShadow: 3 }}>
        <Typography fontWeight="600" mb={2}>
          Items
        </Typography>

        {selectedItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 2,
              mb: 2,
              alignItems: "center",
            }}
          >
            <TextField
              select
              label="Item"
              onChange={(e) =>
                handleItemChange(index, "item_id", e.target.value)
              }
            >
              {items.map((i) => (
                <MenuItem key={i.id} value={i.id} disabled={!i.is_active}>
                  {i.name}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <IconButton onClick={() => changeQty(index, "dec")}>
                <Remove />
              </IconButton>

              <Typography>{item.qty}</Typography>

              <IconButton onClick={() => changeQty(index, "inc")}>
                <Add />
              </IconButton>
            </Box>

            {/* Price */}
            <Typography fontWeight="bold" textAlign="right">
              ₹ {item.price * item.qty}
            </Typography>
          </Box>
        ))}

        <Button variant="outlined" onClick={addItemRow}>
          + Add Item
        </Button>
      </Card>

      <Card
        sx={{
          p: 3,
          mt: 3,
          borderRadius: "16px",
          boxShadow: 3,
          background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)",
        }}
      >
        <Typography>Subtotal: ₹ {subtotal}</Typography>

        {!hasGST && (
          <Typography color="orange">GST (18%): ₹ {gst.toFixed(2)}</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" fontWeight="bold">
          Total: ₹ {total.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "10px",
            px: 4,
          }}
          onClick={handleGenerateBill}
        >
          Generate Bill
        </Button>
      </Card>
    </Box>
  );
};

export default Billing;

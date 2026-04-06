import { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../services/api";

const AddItem = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Item name is required";
    if (!form.price) newErrors.price = "Price is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await addItem(form);
    navigate("/items");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Add New Item
      </Typography>

      <Card
        sx={{
          p: 4,
          borderRadius: "12px",
          maxWidth: "600px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 3,
          }}
        >
          <TextField
            label="Item Name *"
            fullWidth
            value={form.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: "" });
            }}
          />

          <TextField
            label="Customer Selling Price *"
            type="number"
            fullWidth
            value={form.price}
            error={!!errors.price}
            helperText={errors.price}
            onChange={(e) => {
              setForm({ ...form, price: e.target.value });
              setErrors({ ...errors, price: "" });
            }}
          />

          <TextField
            select
            label="Item Status"
            fullWidth
            value={form.is_active ? "active" : "inactive"}
            onChange={(e) =>
              setForm({
                ...form,
                is_active: e.target.value === "active",
              })
            }
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/items")}
          >
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default AddItem;

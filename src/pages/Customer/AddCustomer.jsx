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
import { addCustomer } from "../../services/api";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    pan: "",
    gst_number: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.pan.trim()) newErrors.pan = "PAN is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await addCustomer(form);
    navigate("/customers");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Add New Customer
      </Typography>

      <Card sx={{ p: 4, borderRadius: "12px", maxWidth: "900px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          }}
        >
          <TextField
            label="Customer Name *"
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
            label="Customer Address *"
            fullWidth
            value={form.address}
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
              setErrors({ ...errors, address: "" });
            }}
          />

          <TextField
            label="Customer PAN Number *"
            fullWidth
            value={form.pan}
            error={!!errors.pan}
            helperText={errors.pan}
            onChange={(e) => {
              setForm({ ...form, pan: e.target.value });
              setErrors({ ...errors, pan: "" });
            }}
          />

          <TextField
            label="Customer GST Number (Optional)"
            fullWidth
            value={form.gst_number}
            onChange={(e) => setForm({ ...form, gst_number: e.target.value })}
          />

          <TextField
            select
            label="Customer Status *"
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
            onClick={() => navigate("/customers")}
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

export default AddCustomer;

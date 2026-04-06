import { useEffect, useState } from "react";
import { Box, Button, Card, Typography, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          CUSTOMERS
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
          }}
          onClick={() => navigate("/add-customer")}
        >
          ADD
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 3,
        }}
      >
        {customers.map((c) => (
          <Card
            key={c.id}
            sx={{
              p: 3,
              borderRadius: "16px",
              boxShadow: 2,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography variant="h6" fontWeight="600">
              {c.name}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Chip
                label={c.is_active ? "Active" : "Inactive"}
                sx={{
                  backgroundColor: c.is_active ? "#d4edda" : "#f8d7da",
                  color: c.is_active ? "#155724" : "#721c24",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Customers;

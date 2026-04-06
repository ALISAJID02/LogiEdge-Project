import { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../services/api";

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
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Customers</Typography>
        <Button variant="contained" onClick={() => navigate("/add-customer")}>
          + Add Customer
        </Button>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
      >
        {customers.map((c) => (
          <Card
            key={c.id}
            sx={{
              p: 2,
              borderRadius: "12px",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Typography variant="h6">{c.name}</Typography>

            <Typography
              sx={{
                mt: 2,
                color: c.is_active ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {c.is_active ? "Active" : "Inactive"}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Customers;

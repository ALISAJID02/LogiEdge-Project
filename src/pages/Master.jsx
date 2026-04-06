import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";

const Master = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Master
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 4,
        }}
      >
        <Card
          onClick={() => navigate("/customers")}
          sx={{
            p: 4,
            borderRadius: "20px",
            cursor: "pointer",
            background: "blue",
            color: "#fff",
            transition: "0.3s",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: 8,
            },
          }}
        >
          <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />

          <Typography variant="h5" fontWeight="bold">
            Customers
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>
            Manage all customers and their details
          </Typography>
        </Card>

        <Card
          onClick={() => navigate("/items")}
          sx={{
            p: 4,
            borderRadius: "20px",
            cursor: "pointer",
            background: "red",
            color: "#fff",
            transition: "0.3s",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: 8,
            },
          }}
        >
          <InventoryIcon sx={{ fontSize: 40, mb: 2 }} />

          <Typography variant="h5" fontWeight="bold">
            Items
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>
            Manage products, pricing and availability
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Master;

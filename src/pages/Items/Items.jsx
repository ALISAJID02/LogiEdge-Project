import { useEffect, useState } from "react";
import { Box, Button, Card, Typography, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../services/api";

const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          ITEMS
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
          }}
          onClick={() => navigate("/add-item")}
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
        {items.map((item) => (
          <Card
            key={item.id}
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
              {item.name}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Chip
                label={item.is_active ? "Active" : "Inactive"}
                sx={{
                  backgroundColor: item.is_active ? "#d4edda" : "#f8d7da",
                  color: item.is_active ? "#155724" : "#721c24",
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

export default Items;

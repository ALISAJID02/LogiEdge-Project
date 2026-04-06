import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { name: "Master", path: "/master", icon: <SettingsIcon /> },
    { name: "Billing", path: "/billing", icon: <ReceiptLongIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        background: "linear-gradient(180deg, #1e1e2f, #2a2a40)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={4}
        sx={{ letterSpacing: 1 }}
      >
        LogiEdge
      </Typography>

      <List>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: "10px",
                mb: 1,
                transition: "0.3s",
                backgroundColor: isActive ? "#3a3a55" : "transparent",
                "&:hover": {
                  backgroundColor: "#34344a",
                },
                position: "relative",
              }}
            >
              {isActive && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: "4px",
                    background: "#4cafef",
                    borderRadius: "4px",
                  }}
                />
              )}

              <ListItemIcon sx={{ color: "#fff", minWidth: 35 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: "auto", fontSize: "12px", opacity: 0.6 }}>
        © 2026 LogiEdge
      </Box>
    </Box>
  );
};

export default Sidebar;

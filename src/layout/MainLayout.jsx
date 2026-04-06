import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#fff",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

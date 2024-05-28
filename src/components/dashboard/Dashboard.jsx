import MiniDrawer from "../app/Drawer";
import Box from "@mui/material/Box";

function Dashboard() {
  return (
    <>
      <MiniDrawer />
      <Box display="flex" justifyContent="center" width="100%">
        <h1>Dashboard</h1>
      </Box>
    </>
  );
}

export default Dashboard;

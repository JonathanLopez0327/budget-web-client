import Box from "@mui/material/Box";
import DrawerAppBar from "../app/Appbar";
import React from "react";

function Dashboard() {
  return (
    <React.Fragment>
      <DrawerAppBar />
      <Box display="flex" justifyContent="center" width="100%">
        {/* <MiniDrawer /> */}
        <h1>Dashboard</h1>
      </Box>
    </React.Fragment>
  );
}

export default Dashboard;

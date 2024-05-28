import React from "react";
import Box from "@mui/material/Box";
import MiniDrawer from "../app/Drawer";

function Expense() {
  return (
    <>
      <MiniDrawer />
      <Box display="flex" justifyContent="center" width="100%">
        <h1>Expense</h1>
      </Box>
    </>
  );
}

export default Expense;

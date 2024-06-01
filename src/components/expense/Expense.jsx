import React from "react";
import Box from "@mui/material/Box";
import DrawerAppBar from "../app/Appbar";

function Expense() {
  return (
    <React.Fragment>
      <DrawerAppBar />
      <Box display="flex" justifyContent="center" width="100%">
        <h1>Expense</h1>
      </Box>
    </React.Fragment>
  );
}

export default Expense;

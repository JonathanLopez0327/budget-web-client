import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IncomeDatatable from "./IncomeDatatable";

function Income() {
  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <h1>Income</h1>
      <Box display="flex" justifyContent="flex-end" width="90%">
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link
            to="/income/create"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create
          </Link>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <IncomeDatatable />
      </Box>
    </Box>
  );
}

export default Income;

import React from "react";
import Box from "@mui/material/Box";
import Datatable from "../../components/Account/Datatable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import MiniDrawer from "../../components/Drawer";

function Account() {
  return (
    <>
    <MiniDrawer />
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <h1>Account</h1>
      <Box display="flex" justifyContent="flex-end" width="90%">
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link
            to="/Account/Create"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create
          </Link>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Datatable />
      </Box>
    </Box>
    </>
  );
}

export default Account;

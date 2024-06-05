import React from "react";
import Datatable from "./Datatable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import DrawerAppBar from "../app/Appbar";

function Account() {
  return (
    <React.Fragment>
      <DrawerAppBar />
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
            to="/account/create"
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
    </React.Fragment>
  );
}

export default Account;

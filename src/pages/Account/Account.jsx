import React from "react";
import Box from "@mui/material/Box";
import Datatable from "../../components/Account/Datatable";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Account({ token }) {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <h1>Account</h1>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }} elevation={0}>
        <Datatable token={token} />
      </Paper>
    </Box>
  );
}

export default Account;

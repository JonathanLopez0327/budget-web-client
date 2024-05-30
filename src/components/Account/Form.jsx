import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { BreadcrumbForm } from "./Breadcrumbs";
import { CustomizedSnackbars } from "../app/Snackbar";
import { useParams, useNavigate } from "react-router-dom";

function Form() {
  const [accountName, setAccountName] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [accountType, setAccountType] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_ACCOUNT_URL

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleAccountDescriptionChange = (event) => {
    setAccountDescription(event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleBreadClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    navigate("/account");
  }

  const clearInputs = () => {
    setAccountName("");
    setAccountDescription("");
    setAccountType("");
    setTotalAmount(0);
  };

  /**
   * Si hay un ID en la URL, estamos en la página de edición
   */
  useEffect(() => {
    if (id) {
      axios
        .get(`${apiURL}/${id}`)
        .then((response) => {
          setAccountName(response.data.accountName);
          setAccountDescription(response.data.accountDescription);
          setAccountType(response.data.accountType);
          setTotalAmount(response.data.totalAmount);
        })
        .catch((error) => {
          setMessage("Error al obtener los detalles de la cuenta");
          setSeverity("error");
          setOpen(true);
        });
    }
  }, [id]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!accountName || !accountDescription || !accountType || !totalAmount) {
      setMessage("Todos los campos son obligatorios");
      setSeverity("error");
      setOpen(true);
      return;
    }
  
    try {
      const method = id ? axios.put : axios.post;
      const url = id ? `${apiURL}/${id}` : apiURL;
  
      await method(url, {
        accountName,
        accountDescription,
        accountType,
        totalAmount,
      });
  
      setMessage(`Cuenta ${accountName} ${id ? "modificada" : "creada"} correctamente`);
      setSeverity("success");
      setOpen(true);
      clearInputs();
    } catch (error) {
      setMessage("Error al enviar el formulario");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <CustomizedSnackbars
        open={open}
        message={message}
        severity={severity}
        handleBreadClose={handleBreadClose}
      />
      {/* Title */}
      <h1>New Account</h1>

      <BreadcrumbForm />

      {/* Form input */}
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{
          pt: 6,
        }}
        noValidate
        autoComplete="off"
        component="form"
      >
        <Paper elevation={1} sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="account-name"
                  label="Name"
                  placeholder="BHD"
                  value={accountName}
                  onChange={handleAccountNameChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="account-description"
                  label="Description"
                  placeholder="Account for BHD"
                  value={accountDescription}
                  onChange={handleAccountDescriptionChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type"
                  value={accountType}
                  label="Type of account"
                  onChange={handleAccountTypeChange}
                >
                  <MenuItem value={"CASH"}>CASH</MenuItem>
                  <MenuItem value={"CREDIT_CARD"}>CREDIT CARD</MenuItem>
                  <MenuItem value={"DEBIT_CARD"}>DEBIT CARD</MenuItem>
                  <MenuItem value={"LOAN"}>LOAN</MenuItem>
                  <MenuItem value={"SAVINGS"}>SAVINGS</MenuItem>
                  <MenuItem value={"INSURANCE"}>INSURANCE</MenuItem>
                  <MenuItem value={"INVESTMENTS"}>INVESTMENTS</MenuItem>
                  <MenuItem value={"OVERDRAFTS"}>OVERDRAFTS</MenuItem>
                  <MenuItem value={"OTHERS"}>OTHERS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="amount"
                  label="Amount"
                  type="number"
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Save"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default Form;

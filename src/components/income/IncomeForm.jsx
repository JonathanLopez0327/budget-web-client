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
import { IncomeBreadcrumb } from "./IncomeBreadcrumbs";
import { CustomizedSnackbars } from "../app/Snackbar";
import { useParams, useNavigate } from "react-router-dom";
import DrawerAppBar from "../app/Appbar";

function IncomeForm() {
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_INCOME_URL;
  const accountURL = import.meta.env.VITE_ACCOUNT_URL;

  const handleIncomeCategoryChange = (event) => {
    setIncomeCategory(event.target.value);
  };

  const hanbleIncomeDescriptionChange = (event) => {
    setIncomeDescription(event.target.value);
  };

  const handleIncomeAmountChange = (event) => {
    setIncomeAmount(event.target.value);
  };

  const handleBreadClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    navigate("/income");
  };

  const clearInputs = () => {
    setIncomeCategory("");
    setIncomeDescription("");
    setIncomeAmount(0);
    setSelectedAccount("");
  };

  // GET ACCOUNTS TO POPULATE SELECT
  useEffect(() => {
    axios
      .get("http://localhost:8000/account")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  /**
   * Si hay un ID en la URL, estamos en la página de edición
   */
  useEffect(() => {
    if (id) {
      axios
        .get(`${apiURL}/${id}`)
        .then((response) => {
          setIncomeCategory(response.data.incomeCategory);
          setIncomeDescription(response.data.incomeDescription);
          setSelectedAccount(response.data.accountId);
          setIncomeAmount(response.data.incomeAmount);
        })
        .catch((error) => {
          setMessage("Error getting details of income");
          setSeverity("error");
          setOpen(true);
        });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !incomeCategory ||
      !incomeDescription ||
      !selectedAccount ||
      !incomeAmount
    ) {
      setMessage("All fields are required");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      const method = id ? axios.put : axios.post;
      const url = id ? `${apiURL}/${id}` : apiURL;

      await method(url, {
        incomeCategory,
        incomeDescription,
        accountId: selectedAccount,
        incomeAmount,
      });

      setMessage(
        `Income ${incomeDescription} ${id ? "modified" : "created"} correctly`
      );
      setSeverity("success");
      setOpen(true);
      clearInputs();
    } catch (error) {
      setMessage("Error submitting form");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <React.Fragment>

      <DrawerAppBar />

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
      <h1>New Income</h1>

      <IncomeBreadcrumb />

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
                <InputLabel id="account-type-label">Income Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="income-type"
                  value={incomeCategory}
                  label="Income Type"
                  onChange={handleIncomeCategoryChange}
                >
                  <MenuItem value={"LINEAR_INCOME"}>LINEAR</MenuItem>
                  <MenuItem value={"PASSIVE_INCOME"}>PASSIVE</MenuItem>
                  <MenuItem value={"DIFFERENCE"}>DIFFERENCE</MenuItem>
                  <MenuItem value={"OTHERS"}>OTHERS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="account-select-label">Account Name</InputLabel>
                <Select
                  labelId="account-select-label"
                  id="account-id"
                  value={selectedAccount}
                  label="Account Name"
                  onChange={handleAccountChange}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.accountId} value={account.accountId}>
                      {account.accountName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="income-description"
                  label="Name"
                  placeholder="BHD"
                  value={incomeDescription}
                  onChange={hanbleIncomeDescriptionChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="income-amount"
                  label="Amount"
                  type="number"
                  value={incomeAmount}
                  onChange={handleIncomeAmountChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} direction="row">
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    style={{ marginRight: "2px" }}
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Save"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
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
    </React.Fragment>
  );
}

export default IncomeForm;

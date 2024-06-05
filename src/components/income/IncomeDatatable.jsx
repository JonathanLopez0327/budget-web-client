import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import axios from "axios";
import { DialogComponent } from "../app/Dialog";
import { CustomizedSnackbars } from "../app/Snackbar";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const createColumn = (
  id,
  label,
  minWidth,
  align = "center",
  format = (value) => value
) => ({
  id,
  label,
  minWidth,
  align,
  format,
});

const columns = [
  createColumn("incomeCategory", "Category", 160),
  createColumn("incomeDescription", "Description", 160),
  createColumn("incomeAmount", "Amount", 160),
  createColumn("incomePeriod", "Period", 160),
  createColumn("actions", "Actions", 0),
];

export default function IncomeDatatable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isRun = useRef(false);
  const [data, setData] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const apiURL = import.meta.env.VITE_INCOME_URL;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/income/edit/${id}`);
  };

  // SEARCH
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // GET
  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    axios
      .get(`${apiURL}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // DELETE
  const handleDelete = () => {
    axios
      .delete(`${apiURL}/${deleteId}`)
      .then((res) => {
        // Actualiza los datos en el estado después de eliminar el registro
        setData(data.filter((record) => record.incomeId !== deleteId));
        // Cierra el diálogo
        setDialog(false);

        setMessage("The income has been successfully deleted.");
        setSeverity("primary");
        setAlert(true);
      })
      .catch((err) => console.error(err));
  };

  // Dialog
  const handleClickOpen = (id) => {
    setDeleteId(id);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  // Snackbar
  const handleBreadClose = () => {
    setAlert(false);
  };

  const filteredData = data
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    : [];

  return (
    <Paper
      sx={{ width: { xs: "100%", sm: "90%" }, p: 6, overflow: "hidden", mt: 4 }}
      elevation={1}
    >
      <Grid container spacing={2}>
        <Grid xs={6}>
          <FormControl sx={{ m: 1, pt: 2 }} variant="standard">
            <OutlinedInput
              id="search"
              startAdornment={
                <SearchIcon
                  fontSize="small"
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
              }
              size="small"
              value={searchValue} // establece el valor del input al valor de búsqueda
              onChange={handleSearchChange} // maneja el cambio en el valor del input
            />
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer>
        <Table
          stickyHeader
          sx={{ minWidth: 400 }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : []
              : filteredData || []
            ).map((row) => (
              <TableRow key={row.incomeId}>
                <TableCell component="th" scope="row">
                  {row.incomeCategory}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.incomeDescription}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.incomeAmount}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.incomePeriod}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleEditClick(row.incomeId)}
                  >
                    <EditIcon fontSize="inherit" color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleClickOpen(row.incomeId)}
                  >
                    <DeleteIcon fontSize="inherit" sx={{ color: pink[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <DialogComponent
        dialog={dialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
        title={"Are you sure you want to delete this income?"}
      />
      <CustomizedSnackbars
        open={alert}
        message={message}
        severity={severity}
        handleBreadClose={handleBreadClose}
      />
    </Paper>
  );
}

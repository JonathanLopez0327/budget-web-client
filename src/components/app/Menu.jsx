// MenuComponent.jsx
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function MenuComponent({ open, handleClose, anchorEl }) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Link
        onClick={handleClose}
        to="/account"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem>Accounts</MenuItem>
      </Link>

      <Link
        onClick={handleClose}
        to="/income"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem>Income</MenuItem>
      </Link>

      <Link
        onClick={handleClose}
        to="/expense"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem>Expenses</MenuItem>
      </Link>
    </Menu>
  );
}
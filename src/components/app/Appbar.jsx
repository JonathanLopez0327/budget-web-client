import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import MenuComponent from "./Menu";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapseOpen, setCollapseOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    // onClick={handleDrawerToggle}
    <Box sx={{ textAlign: "center" }}>
      <IconButton sx={{ p: 1 }}>
        <Avatar alt="Remy Sharp" src="/src/assets/logo.png" />
      </IconButton>
      <Typography variant="h6" sx={{ my: 2 }}>
        Money Manager App
      </Typography>
      <Divider />
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton onClick={handleDrawerToggle}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <ListItemButton onClick={handleCollapseClick}>
          <ListItemText primary="Tracking" />
          {collapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Accounts" />
              </ListItemButton>
            </Link>

            <Link
              to="/income"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Incomes" />
              </ListItemButton>
            </Link>

            <Link
              to="/expense"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Expenses" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ p: 1 }}>
            <Avatar alt="Remy Sharp" src="/src/assets/logo.png" />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Money Manager App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Button sx={{ color: "#fff" }}>Dashboard</Button>
            </Link>

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#fff" }}
            >
              Tracking Options
            </Button>
            <MenuComponent open={open} handleClose={handleClose} anchorEl={anchorEl} />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

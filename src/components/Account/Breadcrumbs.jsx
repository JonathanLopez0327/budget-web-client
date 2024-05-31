import React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleBreadClick(event) {
  event.preventDefault();
}

export const BreadcrumbForm = () => (
  <Box display="flex" justifyContent="center" width="100%">
    {/* Links zone */}
    <div role="presentation" onClick={handleBreadClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/account"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          <StyledBreadcrumb
            label="Accounts"
            icon={<AccountBalanceWalletIcon fontSize="small" />}
          />
        </Link>
        <StyledBreadcrumb
          label="Nueva Cuenta"
          icon={<AddIcon fontSize="small" />}
        />
      </Breadcrumbs>
    </div>
  </Box>
);


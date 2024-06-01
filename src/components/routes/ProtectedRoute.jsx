import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DrawerAppBar from "../app/Appbar";
import SimpleLoader from "../app/Loader";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token !== null) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <SimpleLoader />; // Usa tu componente de carga
  }

  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
  // If authenticated, render the child routes
  return (
    <React.Fragment>
      {/* <DrawerAppBar /> */}
      <Outlet />
    </React.Fragment>
  );
};

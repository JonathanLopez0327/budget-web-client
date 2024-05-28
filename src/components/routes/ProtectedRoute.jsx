import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
  // If authenticated, render the child routes
  return <Outlet />;
};

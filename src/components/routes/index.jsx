import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import React, { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Account = lazy(() => import("../account/Account"));
const Income = lazy(() => import("../income/Income"));
const Expense = lazy(() => import("../expense/Expense"));
const Form = lazy(() => import("../account/Form"));

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/expense",
          element: <Expense />,
        },
        {
          path: "/account/create",
          element: <Form />,
        },
        {
          path: "/account/edit/:id",
          element: <Form />,
        },
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page for not auth</div>,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;

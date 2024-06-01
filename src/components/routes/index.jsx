import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import React, { Suspense, lazy } from "react";
import SimpleLoader from "../app/Loader";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Account = lazy(() => import("../account/Account"));
const Form = lazy(() => import("../account/Form"));
const Income = lazy(() => import("../income/Income"));
const IncomeForm = lazy(() => import("../income/IncomeForm"));
const Expense = lazy(() => import("../expense/Expense"));

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
          path: "/income/create",
          element: <IncomeForm />,
        },
        {
          path: "/income/edit/:id",
          element: <IncomeForm />,
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
    <Suspense fallback={<SimpleLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;

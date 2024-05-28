import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";
import Account from "../account/Account";
import Income from "../income/Income";
import Expense from "../expense/Expense";
import Form from "../account/Form";

const Routes = () => {
  const { token } = useAuth();

  // const routesForPublic = [
  //   {
  //     path: "/Home",
  //     element: <Home />,
  //   },
  // ];

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
    ...routesForAuthenticatedOnly
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
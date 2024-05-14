import MiniDrawer from "./components/Drawer";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account/Account";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import useAuth from "./hooks/useAuth";
import AuthContext from "./hooks/authContext";
import Home from "./pages/Home";
import AccountForm from "./pages/Account/AccountForm";
import ProtectedRoute from "./pages/Security/ProtectedRoute";

function App() {
  const [isLogin, token] = useAuth();

  const handleLogin = () => {
    localStorage.setItem("auth", JSON.stringify({ isAuth: true }));
  };

  return isLogin ? (
    <>
      {handleLogin()}
      <AuthContext.Provider value={token}>
        <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 8 }}>
          <Routes>
          <Route
              path="/Home"
              element={
                <Home />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Income"
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Expense"
              element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Account/Create"
              element={
                <ProtectedRoute>
                  <AccountForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </AuthContext.Provider>
    </>
  ) : (
    <Home />
  );
}

export default App;

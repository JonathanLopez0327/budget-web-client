import MiniDrawer from "./components/Drawer";
import Box from "@mui/material/Box";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import useAuth from "./hooks/useAuth";
import Home  from "./pages/Home";

function App() {
  const [isLogin, token] = useAuth()

  return isLogin ? (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 8 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/Expense" element={<Expense />} />
        </Routes>
      </Box>
    </Box>
  ) : <Home />
}

export default App;

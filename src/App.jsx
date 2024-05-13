import MiniDrawer from "./components/Drawer";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account/Account";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import useAuth from "./hooks/useAuth";
import Home  from "./pages/Home";
import AccountForm from "./pages/Account/AccountForm";

function App() {
  const [isLogin, token] = useAuth()

  return isLogin ? (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 8 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Account" element={<Account token={token} />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="/EditAccounts" element={<AccountForm />} />
        </Routes>
      </Box>
    </Box>
  ) : <Home />
}

export default App;

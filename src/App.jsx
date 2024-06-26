import Box from "@mui/material/Box";
import AuthProvider from "./hooks/useAuth";
import Routes from "./components/routes";

function App() {
  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 8 }}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Box>
    </div>
  );
}

export default App;

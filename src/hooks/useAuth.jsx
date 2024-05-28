import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  useMemo,
} from "react";
import Keycloak from "keycloak-js";
import axios from "axios";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    client.init({ onLoad: "login-required" })
      .then((authenticated) => {
        if (authenticated) {
          setToken(client.token);
        }
      })
      .catch((error) => {
        console.error("Error during Keycloak initialization: ", error);
      });
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

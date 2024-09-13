import React, { useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { User, UserContext, UserContextType } from "../../context/UserProvider";

const ProtectedRoute = () => {
  const [isValidToken, setIsValidToken] = React.useState<boolean | null>(null);

  const {  setUser }: UserContextType = useContext(UserContext);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Endpoint para validar el token en tu backend
          const response = await axios.get("/api/auth/user");
          const userData: User = response.data; // O ajusta esto según el tipo de datos que devuelva tu API
          console.log(userData);
          setUser(userData); // Establece el usuario en el contexto
        } catch (error) {
          setIsValidToken(false);
          localStorage.removeItem("token");
        }
      } else {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, []);

  if (isValidToken === null) {
    return <></>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

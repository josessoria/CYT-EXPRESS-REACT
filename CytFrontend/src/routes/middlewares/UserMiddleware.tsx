import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { User, UserContext, UserContextType } from "../../context/UserProvider";

const UserMiddleware = () => {
  const { setUser }: UserContextType = useContext(UserContext);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Endpoint para validar el token en tu backend
          const response = await axios.get("/api/auth/user");
          const userData: User = response.data.user; // O ajusta esto según el tipo de datos que devuelva tu API
          setUser(userData); // Establece el usuario en el contexto
        } catch (error) {
          localStorage.removeItem("token");
        }
      } else {
      }
    };

    validateToken();
  }, []);

  return <Outlet />;
};

export default UserMiddleware;

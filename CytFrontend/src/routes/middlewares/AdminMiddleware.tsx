import React, { useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext, UserContextType } from "../../context/UserProvider";
import { CircularProgress } from "@nextui-org/react";
import "./AdminMiddleware.scss";

const AdminMiddleware = () => {
  const [isValidAdmin, setIsValidAdmin] = React.useState<boolean | null>(null);

  const { setUser }: UserContextType = useContext(UserContext);

  useEffect(() => {
    const checkAdminRole = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userinfo = await axios.get("/api/auth/user");
          setUser(userinfo.data.user);

          if (userinfo.data.user.role === "admin") {
            setIsValidAdmin(true);
          } else {
            setIsValidAdmin(false);
          }
        } catch (error) {
          setIsValidAdmin(false);
          localStorage.removeItem("token");
        }
      } else {
        setIsValidAdmin(false);
      }
    };

    checkAdminRole();
  }, []);

  if (isValidAdmin === null) {
    return (
      <div className="w-full h-full top-[-0px] z-50 absolute bg-white flex justify-center items-center ">
        <span className="loaderperson"></span>
      </div>
    );
  }

  if (!isValidAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminMiddleware;

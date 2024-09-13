import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedUnLoggedRoute from "./middlewares/ProtectedUnLogedUser";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import Home from "../pages/Home";
import NavbarMiddleware from "./middlewares/NavbarMiddleware";
import UserMiddleware from "./middlewares/UserMiddleware";
import Admin from "../pages/Admin/Admin";
import AdminMiddleware from "./middlewares/AdminMiddleware"; // Importa tu nuevo middleware AdminMiddleware

const Router = () => {
  return (
    <Routes>
      <Route element={<NavbarMiddleware />}>
        <Route element={<UserMiddleware />}>
          <Route path="/" element={<Home />} />
          <Route element={<AdminMiddleware />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<ProtectedRoute />}></Route>
        </Route>
      </Route>
      <Route element={<ProtectedUnLoggedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Router;

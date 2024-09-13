import Navbartab from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const NavbarMiddleware = () => {
  return (
    <>
      <Navbartab />
      <Outlet />
    </>
  );
};

export default NavbarMiddleware;

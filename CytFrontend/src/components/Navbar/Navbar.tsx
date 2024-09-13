import React, { useContext } from "react";

import { Link } from "react-router-dom";
import cyt from "../../assets/image/cytlogo.png";
import { useNavigate } from "react-router-dom";
import TabActions from "../TabActions/TabActions";
import axion from "../../api/axios";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { UserContext, UserContextType } from "../../context/UserProvider";
import toast from "react-hot-toast";

const Navbartab = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  const { user, setUser }: UserContextType = useContext(UserContext);

  const handleLogout = (navigate: any) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { onOpen: onOpenProducto } = useDisclosure();
  const { onOpen: onOpenCategoria } = useDisclosure();

  const handleAdmin = async () => {
    try {
      const response = await axion.patch("/api/auth/change-role");
      console.log(response);
      const updatedUser = response.data;
      setUser(updatedUser);
      toast.success("Ahora eres administrador");
    } catch (error) {
      console.error("Error al convertirse en administrador:", error);
    }
  };

  const handleDefault = async () => {
    try {
      const response = await axion.patch("api/Users/current/role/user");
      const updatedUser = response.data;
      setUser(updatedUser);
      toast.success("Ahora eres un usuario sin privilegios");
    } catch (error) {
      console.error("Error al convertirse en usuario sin privilegios:", error);
    }
  };

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <img
              src={cyt}
              className=" w-[100px] cursor-pointer "
              onClick={handleBrandClick}
              alt=""
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <img
              src={cyt}
              className=" w-[100px] cursor-pointer "
              onClick={handleBrandClick}
              alt=""
            />
          </NavbarBrand>
          <NavbarItem isActive>
            <Link color="foreground" aria-current="page" to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            {user?.role === "admin" && (
              <Link color="foreground" aria-current="page" to="/admin">
                Admin
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {!user ? (
            <>
              <NavbarItem className=" lg:flex">
                <Link to="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="warning" to="/register" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className="lg:flex">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform shadow-xl"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => handleLogout(navigate)}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <span
              className="text-[#2D3035] font-[500] cursor-pointer hover:text-[#804DFA] w-[130px] text-center "
              onClick={onOpenProducto}
            >
              Crear producto
            </span>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <span
              className="text-[#2D3035] font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#804DFA]"
              onClick={handleAdmin}
            >
              Ser admin
            </span>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <span
              className="text-[#2D3035] font-[500] cursor-pointer text-center   w-[130px] hover:text-[#804DFA]"
              onClick={handleDefault}
            >
              Ser usuario
            </span>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {user?.role === "admin" && (
              <span
                className="text-[#2D3035] font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#804DFA]"
                onClick={onOpenCategoria}
              >
                Crear Categoría
              </span>
            )}
          </NavbarMenuItem>
          <NavbarMenuItem>
            {user?.role === "admin" && (
              <span
                className="text-[#2D3035] font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#804DFA]"
                onClick={handleAdminClick}
              >
                Dashboard admin
              </span>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      {user && <TabActions />}
    </>
  );
};

export default Navbartab;

// TabActions.tsx
import { useContext, useState } from "react";

import { UserContext, UserContextType } from "../../context/UserProvider";

import axion from "../../api/axios";
import toast from "react-hot-toast";
import "./TabActions.scss";
import Crearproducto from "./Crearproducto";
import Crearcategoria from "./Crearcategoria";

const TabActions = () => {
  const { user, setUser }: UserContextType = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false); // Estado para controlar el modal

  const handleAdmin = async () => {
    try {
      const response = await axion.patch("/api/auth/change-role", {
        newRole: "admin",
      });
      const updatedUser = response.data;
      setUser(updatedUser.user);
      console.log(user);
      toast.success("Ahora eres administrador");
    } catch (error) {
      console.error("Error al convertirse en administrador:", error);
      toast.error("No se pudo cambiar el rol");
    }
  };

  const handleDefault = async () => {
    try {
      const response = await axion.patch("/api/auth/change-role", {
        newRole: "user",
      });
      const updatedUser = response.data;
      setUser(updatedUser.user);
      console.log(user);
      toast.success("Ahora eres un usuario sin privilegios");
    } catch (error) {
      console.error("Error al convertirse en usuario sin privilegios:", error);
    }
  };

  return (
    <>
      <div className="navchica w-full flex flex-wrap z-10 gap-5 py-[10px] bg-[#0F2A3D] justify-center fixed border-b-1 px-5">
        <span
          onClick={() => setIsModalOpen(true)}
          className="text-white font-[500] cursor-pointer hover:text-[#804DFA] w-[130px] text-center "
        >
          Crear producto
        </span>

        <span
          className="text-white font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#804DFA]"
          onClick={handleAdmin}
        >
          Ser admin
        </span>

        <span
          className="text-white font-[500] cursor-pointer text-center   w-[130px] hover:text-[#804DFA]"
          onClick={handleDefault}
        >
          Ser usuario
        </span>

        {user?.role === "admin" && (
          <span
            onClick={() => setIsModalCategoryOpen(true)}
            className="text-white font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#804DFA]"
          >
            Crear Categoría
          </span>
        )}
      </div>
      <Crearproducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Crearcategoria
        isOpen={isModalCategoryOpen}
        onClose={() => setIsModalCategoryOpen(false)}
      />
    </>
  );
};

export default TabActions;

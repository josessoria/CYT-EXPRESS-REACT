import { useState, useContext, useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import axios from "../../api/axios";
import UsersTable from "./UserTable";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import {
  UsersContext,
  UsersContextType,
} from "../../context/UsersAdminProvider";
import toast from "react-hot-toast";
const AdminComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, deleteUser, addUser, updateUser, setUsers }: UsersContextType =
    useContext(UsersContext);

  const handleCreateUser = async (newUser: any) => {
    try {
      const response = await axios.post("/api/auth/register", newUser);
      console.log(response.data);
      addUser(response.data.user);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Error al crear usuario.");
      } else {
        toast.error("Error de red al intentar crear usuario.");
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/api/auth/users");
        setUsers(data.users); // Ajustar a data.users para obtener la lista de usuarios
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);
  const handleEditUser = async (updatedUser: any) => {
    try {
      const response = await axios.patch(
        `/api/auth/update-user/${updatedUser._id}`,
        updatedUser
      );

      updateUser(response.data.user);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/auth/users/${id}`);
      deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-[60px]">
        <h2 className="text-2xl font-bold mb-4">Admin Panel - Users</h2>
        <div className="flex justify-end mb-4">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onPress={onOpen}
          >
            Crear Nuevo Usuario
          </Button>
        </div>
        <UsersTable
          users={users}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={openEditModal}
        />
      </div>
      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateUser={handleCreateUser}
      />
      {selectedUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={closeEditModal}
          handleEditUser={handleEditUser}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default AdminComponent;

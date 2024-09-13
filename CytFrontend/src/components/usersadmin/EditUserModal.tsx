// EditUserModal.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";


const EditUserModal = ({
  isOpen,
  onClose,
  handleEditUser,
  user,
}: {
  isOpen: any;
  onClose: any;
  handleEditUser: any;
  user: { username: string; email: string; role: string; PasswordHash: string };
}) => {
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    role: "",
  });
 

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleEditUser(editedUser);
    onClose();
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Editar usuario
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Username"
            placeholder="Nombre de usuario"
            variant="bordered"
            size="sm"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            labelPlacement="outside"
          />
          <Input
            type="email"
            label="Email"
            placeholder="Email del usuario"
            variant="bordered"
            size="sm"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            labelPlacement="outside"
          />

          <Input
            type="text"
            label="Role"
            placeholder="Rol del usuario"
            variant="bordered"
            size="sm"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            labelPlacement="outside"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
          <Button className="bg-[#804BFA]" onClick={handleSubmit}>
            <span className="text-white font-[500]">Guardar cambios</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;

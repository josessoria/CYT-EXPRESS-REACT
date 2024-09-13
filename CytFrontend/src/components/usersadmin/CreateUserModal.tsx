import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const CreateUserModal = ({
  isOpen,
  onClose,
  handleCreateUser,
}: {
  isOpen: any;
  onClose: any;
  handleCreateUser: any;
}) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleCreateUser(newUser);
    onClose();
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Crear nuevo usuario
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Username"
            placeholder="Nombre de usuario"
            variant="bordered"
            size="sm"
            name="username"
            value={newUser.username}
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
            value={newUser.email}
            onChange={handleChange}
            labelPlacement="outside"
          />
          <Input
            type={isVisible ? "text" : "password"}
            label="Contraseña"
            placeholder="Ingrese una contraseña"
            variant="bordered"
            size="sm"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            labelPlacement="outside"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <BsEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
          <Button className="bg-[#804BFA]" onClick={handleSubmit}>
            <span className="text-white font-[500]">Crear</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;

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
import axios from "../../api/axios"; // Asegúrate de tener axios instalado
import { useCategoryContext } from "../../context/CategoryContext";

import toast from "react-hot-toast";

interface CrearproductoProps {
  isOpen: boolean;
  onClose: () => void;
}

const Crearcategoria: React.FC<CrearproductoProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");

  const { setCategories, addCategory } = useCategoryContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  const handleSubmit = async () => {
    try {
      const categorytData = {
        name,
      };
      const response = await axios.post("/api/categories", categorytData);
      const newcategory = response.data;
      console.log(newcategory.category)
      addCategory(newcategory.category);
      toast.success("Categoria creada con éxito.");
      onClose();
    } catch (error: unknown) {
      if (error && (error as any).response) {
        toast.error(
          (error as any).response?.data?.message ||
            "Error al crear la categoria."
        );
      } else {
        toast.error("Error de red al intentar crear el producto.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader>
            <h3 className="text-xl font-semibold">Crear Categoria</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre de la categoria"
                placeholder="Ingrese la categoria"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Crear Categoria
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default Crearcategoria;

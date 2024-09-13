import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "../../api/axios"; // Asegúrate de tener axios instalado
import { useCategoryContext } from "../../context/CategoryContext";
import { useProductContext } from "../../context/ProductContext";
import toast from "react-hot-toast";

interface CrearproductoProps {
  isOpen: boolean;
  onClose: () => void;
}

const Crearproducto: React.FC<CrearproductoProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Inicializa con una cadena vacía

  const { categories, setCategories } = useCategoryContext();
  const { addProduct } = useProductContext();

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        name,
        price,
        description,
        category,
      };
      const response = await axios.post("/api/products", productData);
      const newProduct = response.data;
      addProduct(newProduct);
      toast.success("Producto creado con éxito.");

      onClose();
    } catch (error: unknown) {
      if (error && (error as any).response) {
        toast.error(
          (error as any).response?.data?.message ||
            "Error al crear el producto."
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
            <h3 className="text-xl font-semibold">Crear Producto</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre del Producto"
                placeholder="Ingrese el nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                label="Precio"
                placeholder="Ingrese el precio"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Textarea
                label="Descripción"
                placeholder="Ingrese la descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <select
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full h-[40px] outline-none bg-[#F9F9F9]  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Crear Producto
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default Crearproducto;

import React, { createContext, useState, ReactNode, useContext } from "react";

// Interfaz para una categoría
export interface Category {
  _id: number;
  name: string;
}

// Interfaz para el contexto de categorías
export interface CategoryContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (newCategory: Category) => void;
}

// Contexto inicial vacío
const initialCategories: Category[] = [];

// Crear el contexto de categorías
export const CategoryContext = createContext<CategoryContextType>({
  categories: initialCategories,
  setCategories: () => {},
  addCategory: () => {},
});

// Proveedor de contexto de categorías
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Función para agregar una nueva categoría
  const addCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, addCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de categorías
export const useCategoryContext = () => useContext(CategoryContext);

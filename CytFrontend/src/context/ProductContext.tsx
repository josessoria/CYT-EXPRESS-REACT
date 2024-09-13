interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category?: {
    _id: string;
    name: string;
  } | null; // Added null to handle cases where category might be missing
}

import React, { createContext, useState, ReactNode, useContext } from "react";

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addProduct: (newProduct: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void; // Cambiado a string
  deleteProduct: (id: string) => void; // Cambiado a string
}

const initialProductContext: ProductContextType = {
  products: [],
  setProducts: () => {},
  product: null,
  setProduct: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
};

export const ProductContext = createContext<ProductContextType>(
  initialProductContext
);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p._id === id ? updatedProduct : p
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p._id !== id);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductProvider;

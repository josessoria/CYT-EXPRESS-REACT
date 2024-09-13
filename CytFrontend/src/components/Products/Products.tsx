import "./Products.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { useProductContext } from "../../context/ProductContext";
import Logo from "../../assets/image/cytlogo.png";
import { FaTrash } from "react-icons/fa";
import { UserContext, UserContextType } from "../../context/UserProvider";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category?: {
    _id: string;
    name: string;
  } | null;
}

const Products: React.FC = () => {
  const { setProducts, products, deleteProduct } = useProductContext();
  const { user }: UserContextType = useContext(UserContext);
  const [groupedProducts, setGroupedProducts] = useState<{
    [key: string]: Product[];
  }>({});

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get<Product[]>("/api/Products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      deleteProduct(productId);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };
  useEffect(() => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category?.name || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });

    setGroupedProducts(grouped);
  }, [products]);
  const noProducts = Object.keys(groupedProducts).length === 0;
  return (
    <div className="w-full p-4">
      {loading && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <div className="loader" />
              <div className="loader" />
              <div className="loader" />
              <div className="loader" />
              <div className="loader" />
            </div>
          </div>
        </div>
      )}

      {!loading && noProducts && (
        <div className="text-center text-xl font-bold text-gray-700">
          No hay productos disponibles.
        </div>
      )}

      {/* Principal Content */}
      {!loading &&
        !noProducts &&
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {groupedProducts[category].map((product) => (
                <div
                  key={product._id}
                  className="bg-white flex flex-col p-2 rounded-2xl shadow-lg"
                >
                  <div className="imagenfoto w-full h-[200px] flex justify-center relative items-center bg-gray-100">
                    <img src={Logo} className="rounded-2xl" alt="" />
                    <div className="w-full absolute flex justify-end top-[-25px] gap-4">
                      {user?.role === "admin" && (
                        <FaTrash
                          className="text-red-600 text-[20px] cursor-pointer"
                          onClick={() => handleDelete(product._id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="itemscarta flex flex-col gap-4">
                    <h3 className="text-xl text-start font-medium  text-[25px] mt-[10px]">
                      {product.name}
                    </h3>
                    <p className="font-[700] leading-none   text-[#804ffa] text-start text-[30px]">
                      {product.price.toFixed(2)}$
                    </p>
                    <p className="text-gray-600 text-justify text-[15px]">
                      {product.description}
                    </p>
                    <div className="addtocart w-full gap-4 flex">
                      <div className=" w-1/2 h-[40px] flex text-[#804ffa] justify-center  rounded-2xl cursor-pointer items-center border border-[#804ffa]  ">
                        Comprar
                      </div>
                      <div className=" w-1/2 h-[40px] flex text-white justify-center  rounded-2xl cursor-pointer items-center bg-[#804ffa] ">
                       Añadir a carrito
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;

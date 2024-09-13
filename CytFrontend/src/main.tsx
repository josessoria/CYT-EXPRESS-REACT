import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import UserProvider from "./context/UserProvider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProductProvider from "./context/ProductContext.tsx";
import { UsersProvider } from "./context/UsersAdminProvider.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ProductProvider>
              <UsersProvider>
                <CategoryProvider>
                  <Toaster position="top-right" reverseOrder={false} />
                  <App />
                </CategoryProvider>
              </UsersProvider>
            </ProductProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);

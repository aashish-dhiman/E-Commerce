import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <CartProvider>
            <ToastContainer />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartProvider>
    </AuthProvider>
);

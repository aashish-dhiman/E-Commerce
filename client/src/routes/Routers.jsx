import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import PageNotFound from "./../pages/PageNotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Products from "../pages/Products/Products";
import ProductPage from "../pages/Products/ProductPage";
import Orders from "./../pages/user/Orders/Orders";
import Wishlist from "../pages/user/Wishlist/Wishlist";
import Cart from "../pages/user/Cart/Cart";
import Shipping from "../pages/user/Cart/Shipping";
import OrderSuccess from "../pages/user/Cart/OrderSuccess";
import OrderFailed from "../pages/user/Cart/OrderFailed";
import OrderDetails from "../pages/user/Orders/OrderDetails";
import AdminOrders from "../pages/Admin/AdminOrders";
import UpdateOrders from "../pages/Admin/UpdateOrders";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<Products />} />
            <Route path="/search" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<PrivateRoute />}>
                <Route path="" element={<Shipping />} />
                <Route path="confirm" element={<OrderSuccess />} />
                <Route path="failed" element={<OrderFailed />} />
            </Route>
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="/user" element={<PrivateRoute />}>
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route
                    path="orders/order_details/:id"
                    element={<OrderDetails />}
                />
                <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard/*" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route
                    path="orders/order_details/:id"
                    element={<UpdateOrders />}
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;

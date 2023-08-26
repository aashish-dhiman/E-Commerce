import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "./../pages/PageNotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Wishlist from "../pages/user/Wishlist";
import Orders from "../pages/user/Orders";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user/*" element={<Dashboard />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />}>
                <Route path="admin/*" element={<AdminDashboard />} />
            </Route>
            <Route path="/wishlist" element={<PrivateRoute />}>
                <Route path="" element={<Wishlist />} />
            </Route>
            <Route path="/orders" element={<PrivateRoute />}>
                <Route path="" element={<Orders />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;

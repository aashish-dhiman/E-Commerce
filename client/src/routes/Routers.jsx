import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "./../pages/PageNotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user" element={<PrivateRoute />}>
                <Route path="dashboard/*" element={<Dashboard />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard/*" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;

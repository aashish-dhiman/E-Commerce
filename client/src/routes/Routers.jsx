import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "./../pages/PageNotFound";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import Register from "../pages/Auth/Register";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;

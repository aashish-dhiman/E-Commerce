import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth, LogOut, isContextLoading] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const authCheck = async () => {
        try {
            console.log("authCheck called");
            const res = await axios.get("/api/v1/auth/admin-auth", {
                headers: {
                    Authorization: auth?.token,
                },
            });
            // console.log("isContextLoading:" + isContextLoading);
            // console.log(res.data);

            setOk(res.data.ok === true); // Update ok based on the response
            // console.log("func:" + (res.data.ok === true)); // Log the updated value
            // console.log("func:" + ok);
        } catch (error) {
            console.log(error);
            // console.log("token available");
            // console.log("loading:" + isContextLoading);

            // When isContextLoading becomes false, it means the context has been loaded

            if (error.response?.status === 401 && !isContextLoading) {
                setTimeout(() => {
                    toast.error("Admin Privileges Required!", {
                        toastId: "userNotAdmin",
                    });

                    navigate("/", {
                        state: location.pathname,
                    });
                }, 500);
            }
        }
    };

    useEffect(() => {
        !isContextLoading && authCheck();
    }, [isContextLoading]);

    return ok ? <Outlet /> : <Spinner />;
};

export default AdminRoute;

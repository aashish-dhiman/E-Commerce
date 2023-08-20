/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth", {
                headers: {
                    Authorization: auth?.token,
                },
            });
            res?.data.ok ? setOk(true) : setOk(false);
        };
        if (auth?.token) {
            authCheck();
        } else {
            // If user is not logged in, wait for some seconds and then navigate to login
            setTimeout(() => {
                toast.error("Please Log in to access Details!", {
                    toastId: "userNotLoggedIn",
                });
                navigate("/login", {
                    state: location.pathname,
                });
            }, 1000);
        }
    }, [auth.token, navigate]);

    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;

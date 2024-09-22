import { Route, Routes, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";
import EditProduct from "./EditProduct";
import SeoData from "../../SEO/SeoData";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    useEffect(() => {
        if (window.location.pathname === "/admin/dashboard") {
            navigate("./profile");
        }
    }, [navigate]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <>
            <SeoData title="Admin Dashboard" />
            <div className="py-[5px] h-full">
                <div className="flex items-start justify-between text-[14px] h-full px-2 sm:px-[50px] py-2 sm:py-[40px] gap-5">
                    <div
                        className={`sm:w-[30%] ${
                            isMenuOpen
                                ? "relative w-full h-full bg-white z-50"
                                : "hidden"
                        } sm:inline-block `}
                    >
                        <AdminMenu toggleMenu={toggleMenu} />
                    </div>
                    <div
                        className={`w-full sm:w-[70%] bg-white h-full shadow-md rounded-sm ${
                            isMenuOpen ? "hidden" : "block"
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className="sm:hidden text-blue-400 underline rounded px-2 text-lg py-2"
                        >
                            {isMenuOpen ? "Close" : <GiHamburgerMenu />}
                        </button>
                        <Routes>
                            <Route path="" element={<UserProfile />} />
                            <Route path="profile" element={<UserProfile />} />
                            <Route
                                path="address"
                                element={<AddressComponent />}
                            />
                            <Route path="pan" element={<PanCardComponent />} />
                            <Route
                                path="add-product"
                                element={<CreateProduct />}
                            />
                            <Route
                                path="all-products"
                                element={<AllProducts />}
                            />
                            <Route path="users" element={<Users />} />
                            <Route
                                path="profile/deactivate"
                                element={<Deactivate />}
                            />
                            <Route
                                path="product/:productId"
                                element={<EditProduct />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;

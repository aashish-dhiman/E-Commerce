import { Route, Routes, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Deactivate from "../Auth/Deactivate";
import Reviews from "./Reviews";
import PaymentCards from "./PaymentCards";
import SeoData from "../../SEO/SeoData";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    useEffect(() => {
        if (window.location.pathname === "/user/dashboard")
            navigate("./profile");
    }, [navigate]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <>
            <SeoData title="User Dashboard" />
            <div className=" py-[5px]">
                <div className="flex items-start justify-between text-[14px] px-2 sm:px-[50px] py-2 sm:py-[40px] gap-5">
                    <div
                        className={`sm:w-[30%] ${
                            isMenuOpen
                                ? "w-full h-full bg-white relative"
                                : "hidden"
                        } sm:inline-block `}
                    >
                        <UserMenu toggleMenu={toggleMenu} />
                    </div>
                    <div
                        className={`w-full sm:w-[70%] bg-white shadow-md rounded-sm ${
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
                            {/* <Route path="" element={<UserProfile />} /> */}
                            <Route path="profile" element={<UserProfile />} />
                            <Route
                                path="address"
                                element={<AddressComponent />}
                            />
                            <Route path="pan" element={<PanCardComponent />} />
                            <Route
                                path="payment-cards"
                                element={<PaymentCards />}
                            />
                            <Route path="user-review" element={<Reviews />} />
                            <Route
                                path="profile/deactivate"
                                element={<Deactivate />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

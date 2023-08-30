import { useAuth } from "../../context/auth";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const UserMenu = () => {
    const [auth, setAuth, LogOut] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        LogOut();
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 p-3 bg-white rounded-sm shadow-md">
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                    alt="user svg"
                />

                <div className="flex flex-col justify-center p-1">
                    <div className="text-[12px]">Hello,</div>
                    <div className="font-[600] ">{auth?.user?.name}</div>
                </div>
            </div>

            <div className="bg-white flex flex-col justify-center rounded-sm shadow-md">
                <div className="flex flex-col justify-center border-b-[1px]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <PersonIcon className="text-primaryBlue text-[16px]" />
                        <div className="font-[600] text-[12px] text-slate-500">
                            ACCOUNT SETTINGS
                        </div>
                    </div>
                    <div className="flex flex-col  text-black font-[300] text-[12px] mb-2 mt-0 ">
                        <NavLink
                            to="./profile"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                Profile Information
                            </div>
                        </NavLink>

                        <NavLink
                            to="./address"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                Manage Addresses
                            </div>
                        </NavLink>

                        <NavLink
                            to="./pan"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                Pan Card
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b-[1px]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <BarChartIcon className="text-primaryBlue text-[16px]" />
                        <div className="font-[600] text-[12px] text-slate-500">
                            DASHBOARD
                        </div>
                    </div>
                    <div className="flex flex-col  text-black font-[300] text-[12px] mb-2 mt-0 ">
                        <NavLink
                            to="./orders "
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                My Orders
                            </div>
                        </NavLink>

                        <NavLink
                            to="./wishlist"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                My Wishlist
                            </div>
                        </NavLink>

                        <NavLink
                            to="./payment-cards"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
                                Saved Cards
                            </div>
                        </NavLink>

                        <NavLink
                            to=""
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
                                    : ""
                            }
                        >
                            <div className=" h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]"></div>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b-[1px]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px] group">
                        <PowerSettingsNewIcon className="text-primaryBlue text-[16px]" />
                        <button
                            className="font-[600] text-[14px] w-full h-[40px] flex items-center text-slate-500 group-hover:text-primaryBlue"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;

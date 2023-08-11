import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiHomeSmile, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsSearch, BsCart2 } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    return (
        <header>
            <div className="container" onMouseLeave={closeDropdown}>
                <div className=" flex items-center justify-between gap-5 w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                    {/* primary div */}
                    <div className=" sm:h-[100px] md:h-[60px] lg:h-[60px] flex items-center justify-between w-[100%] max-w-[650px]">
                        <div className=" flex gap-[20px] items-center w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                            {/* logo */}

                            <img src={logo} alt="logo" className=" max-h-fit" />

                            {/* search bar*/}
                            <div className="w-[100%]">
                                <form
                                    action="/search"
                                    method=""
                                    className="bg-[#f0f5ff] rounded-lg relative "
                                >
                                    <div className="flex items-center">
                                        <div className=" flex items-center px-2">
                                            <button type="submit">
                                                <figure className=" text-slate-500 bg-transparent">
                                                    <BsSearch />
                                                </figure>
                                            </button>
                                        </div>
                                        <div className="w-[300px]">
                                            <input
                                                type="text"
                                                title="Search for Products, Brands and More"
                                                placeholder="Search for Products, Brands and More"
                                                autoComplete="off"
                                                className=" bg-transparent w-[100%] border-none outline-none text-[14px] md:text-[16px] p-1 placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* secondary div */}
                    <div className="flex items-center justify-between gap-[20px] w-[50%]">
                        {/* home */}
                        <div className="flex items-center group">
                            <NavLink to="/" className="flex items-center gap-1">
                                <BiHomeSmile className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block group-hover:text-slate-700">
                                    Home
                                </span>
                            </NavLink>
                        </div>
                        {/* category */}
                        <div className="flex items-center group">
                            <NavLink
                                to="/category"
                                className="flex items-center gap-1"
                            >
                                <BiCategoryAlt className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block group-hover:text-slate-700">
                                    Category
                                </span>
                            </NavLink>
                        </div>
                        {/* Account */}
                        <div className="flex items-center relative cursor-pointer group hover:bg-slate-100 rounded-md">
                            <div
                                className="flex items-center gap-1 "
                                onMouseEnter={toggleDropdown}
                            >
                                <AiOutlineUser className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block">
                                    <p className="text-[16px]"> Account</p>
                                </span>
                                <span>
                                    <RiArrowDropDownLine className="group-hover:rotate-[180deg] transition-all" />
                                </span>
                            </div>
                            {/* dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-[28px] -left-[16px] bg-white border border-gray-300 rounded-md p-2 z-10 w-[140px] transition-all flex flex-col">
                                    <ul>
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to="/user"
                                                className="flex items-center gap-1"
                                            >
                                                <AiOutlineUser className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    My Account
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to="/wishlist"
                                                className="flex items-center gap-1"
                                            >
                                                <AiOutlineHeart className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    Wishlist
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to="/login"
                                                className="flex items-center gap-1"
                                            >
                                                <MdLogin className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    Login
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to="/register"
                                                className="flex items-center gap-1"
                                            >
                                                <MdLogin className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    Register
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="p-1 hover:bg-slate-100 rounded-md hidden">
                                            <Link
                                                to="/logout"
                                                className="flex items-center gap-1"
                                            >
                                                <MdLogout className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    Logout
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* cart */}
                        <div className="flex items-center gap-1 group">
                            <NavLink
                                to="/cart"
                                className="relative flex items-center gap-1"
                            >
                                <span className="absolute w-4 h-4 text-[11px] text-center font-semibold left-2 bottom-3 text-white bg-red-500 rounded-[50%] ">
                                    0
                                </span>
                                <BsCart2 className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block group-hover:text-slate-700">
                                    <p className="text-[16px]">Cart</p>
                                </span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

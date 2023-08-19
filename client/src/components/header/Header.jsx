import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiHomeSmile, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsSearch, BsCart2 } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const headerRef = useRef(null);

    const [auth, setAuth] = useAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logged out Successfully!");
    };

    const handleStickyHeader = () => {
        if (
            document.body.scrollTop > 10 ||
            document.documentElement.scrollTop > 10
        ) {
            headerRef.current.classList.add("sticky__header");
        } else {
            headerRef.current.classList.remove("sticky__header");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyHeader);
        //clean up function
        return () => {
            window.removeEventListener("scroll", handleStickyHeader);
        };
    });
    return (
        <header ref={headerRef}>
            <div className="container" onMouseLeave={closeDropdown}>
                <div className=" flex items-center justify-between gap-5 w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                    {/* primary div */}
                    <div className=" sm:h-[100px] md:h-[60px] lg:h-[60px] flex items-center justify-between w-[100%] max-w-[650px]">
                        <div className=" flex gap-[20px] items-center w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                            {/* logo */}
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className=" max-h-fit"
                                />
                            </Link>

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
                        <div
                            className={`flex items-center relative cursor-pointer group ${
                                auth.user
                                    ? "hover:bg-slate-100"
                                    : "hover:bg-primaryBlue"
                            } rounded-md p-1`}
                            onMouseEnter={toggleDropdown}
                        >
                            {auth.user ? (
                                <div className="flex items-center gap-1 ">
                                    <AiOutlineUser className="text-[20px] " />
                                    <span className="text-[16px] w-[50px] max-w-fit hidden md:block lg:block ">
                                        <p className="text-[14px]">
                                            {auth.user.name.split(" ")[0]}
                                        </p>
                                    </span>
                                    <span>
                                        <RiArrowDropDownLine className="group-hover:rotate-[180deg] transition-all " />
                                    </span>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className=" text-[14px] group-hover:text-white"
                                >
                                    <div className="flex items-center gap-1 ">
                                        <AiOutlineUser className="text-[20px] group-hover:text-white" />
                                        <span className="text-[14px] w-[50px] max-w-fit hidden md:block lg:block ">
                                            <p className="text-[14px]">
                                                Sign in
                                            </p>
                                        </span>
                                        <span>
                                            <RiArrowDropDownLine
                                                className="group-hover:rotate-[180deg] transition-all 
                                                    group-hover:text-white"
                                            />
                                        </span>
                                    </div>
                                </Link>
                            )}

                            {/* dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-[30px] -left-[2px] bg-white border border-gray-300 rounded-md p-2 z-10 w-[140px] transition-all flex flex-col">
                                    <ul>
                                        {!auth.user && (
                                            <li className="p-1 hover:bg-slate-100 rounded-md">
                                                <Link
                                                    to="/register"
                                                    className="flex items-center gap-2"
                                                >
                                                    <MdLogin className="text-[12px]" />
                                                    <span className="text-[14px]">
                                                        Sign up
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to="/user"
                                                className="flex items-center gap-2"
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
                                                className="flex items-center gap-2"
                                            >
                                                <AiOutlineHeart className="text-[12px]" />
                                                <span className="text-[14px]">
                                                    Wishlist
                                                </span>
                                            </Link>
                                        </li>

                                        {auth.user && (
                                            <li className="p-1 hover:bg-slate-100 rounded-md ">
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="flex items-center gap-2"
                                                >
                                                    <MdLogout className="text-[12px]" />
                                                    <span className="text-[14px]">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
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

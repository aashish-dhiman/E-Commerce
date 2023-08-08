import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BsSearch } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className=" flex items-center justify-between gap-5 w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                    {/* primary div */}
                    <div className=" sm:h-[100px] md:h-[60px] lg:h-[60px] flex items-center justify-between w-[100%] ">
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
                    <div className="flex items-center gap-[20px]">
                        {/* home */}
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center gap-1">
                                <BiHomeSmile className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block">
                                    Home
                                </span>
                            </NavLink>
                        </div>

                        {/* category */}
                        <div className="flex items-center">
                            <NavLink
                                to="/category"
                                className="flex items-center gap-1"
                            >
                                <BiCategoryAlt className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block">
                                    Category
                                </span>
                            </NavLink>
                        </div>
                        {/* Account */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-1">
                                <AiOutlineUser className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block">
                                    <p className="text-[16px]"> Account</p>
                                </span>
                            </div>
                        </div>

                        {/* cart */}
                        <div className="flex items-center gap-1">
                            <NavLink
                                to="/cart"
                                className="relative flex items-center gap-1"
                            >
                                <span className="absolute w-4 h-4 text-[11px] text-center font-semibold left-2 bottom-2 text-white bg-red-500 rounded-[50%] ">
                                    0
                                </span>
                                <BsCart2 className="text-[20px]" />
                                <span className="text-[16px] hidden md:block lg:block">
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

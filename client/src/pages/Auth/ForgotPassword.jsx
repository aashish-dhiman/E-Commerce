/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import authImg from "../../assets/images/auth.png";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner";
import SeoData from "../../SEO/SeoData";

const ForgotPassword = () => {
    //hooks->
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (userFound) {
                if (password !== confirmPassword) {
                    toast.error("Password does not match!");
                    return;
                }
                const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/forgot-password`,
                    {
                        email,
                        password,
                    }
                );
                console.log(response);

                if (response.status === 200) {
                    setUserFound(false);
                    toast.success("Password Reset Successfully!", {
                        toastId: "passwordReset",
                    });
                    navigate("/login");
                }
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-exist`,
                    {
                        email,
                    }
                );

                if (response.status === 200) {
                    setUserFound(true);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            //user not registered
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidUser" &&
                toast.error("User not Found!");
            //server error
            error.response?.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/forgot-password");
        } finally {
            setIsSubmitting(false);
        }
    };

    // display content
    return (
        <>
            <SeoData
                title="Forgot Password - Existing User"
                description="Forgot Password"
            />

            <div className="container bg-primaryBg mt-5 sm:mt-0 md:mt-0 lg:mt-0 py-[2px]">
                <div className="flex items-center flex-col sm:flex-row md:flow-row lg:flex-row my-10 mx-auto w-full sm:w-[70vw] md:w-[70vw] lg:w-[70vw] min-h-[400px] md:h-[80vh] lg:h-[80vh] bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] ">
                    {/* left view  */}
                    <div className=" w-full md:w-[40%] lg:w-[40%] h-full bg-primaryBlue">
                        <div className="flex gap-6 flex-col h-full mt-10 px-6 ">
                            <div className="text-white leading-8 text-[22px] font-[600]">
                                <h2>Forgot Password</h2>
                            </div>
                            <div className="text-slate-300 text-[15px] leading-7 font-[400]">
                                <p>
                                    Forgot your password? No worries, we've got
                                    you covered!
                                </p>
                            </div>
                            <div className="mt-8">
                                <img src={authImg} alt="auth image" />
                            </div>
                        </div>
                    </div>

                    {/* forgot password form */}
                    <div className="relative p-10 w-full h-full sm:w-[60%] md:w-[60%] lg:w-[60%] flex flex-col gap-y-10 ">
                        {isSubmitting ? (
                            <div className="flex items-center justify-center ">
                                <Spinner />
                            </div>
                        ) : (
                            <div className=" h-full w-full">
                                <form
                                    action="/login"
                                    method="post"
                                    className="w-[90%] mx-auto transition-all"
                                    onSubmit={handleFormSubmit}
                                >
                                    <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pt-3 ">
                                        <div className="relative">
                                            <input
                                                autoComplete="on"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="peer placeholder-transparent h-8 w-full border-b-2 text-gray-900 text-sm focus:outline-none focus:border-blue-400"
                                                placeholder="Email address"
                                                required
                                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                            >
                                                Enter Your Email Address
                                            </label>
                                        </div>
                                        {userFound && (
                                            <>
                                                <div className="relative">
                                                    <input
                                                        autoComplete="off"
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer placeholder-transparent h-8 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                        placeholder="Password"
                                                        required
                                                        minLength="5"
                                                    />
                                                    <label
                                                        htmlFor="password"
                                                        className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                                    >
                                                        New Password
                                                    </label>
                                                </div>

                                                <div className="relative">
                                                    <input
                                                        autoComplete="off"
                                                        id="confirm_password"
                                                        name="confirm_password"
                                                        value={confirmPassword}
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="peer placeholder-transparent h-8 w-full border-b-2 focus:border-blue-400 text-gray-900 focus:outline-none text-sm"
                                                        placeholder="Confirm Password"
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="confirm_password"
                                                        className="absolute left-0 -top-3 text-gray-600 text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-xs"
                                                    >
                                                        Confirm Password
                                                    </label>
                                                    <span
                                                        className="absolute right-3 bottom-2 hover:text-black cursor-pointer"
                                                        onClick={
                                                            handlePasswordToggle
                                                        }
                                                    >
                                                        {!showPassword && (
                                                            <AiFillEye />
                                                        )}
                                                        {showPassword && (
                                                            <AiFillEyeInvisible />
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        <div className="text-[9px] text-slate-500 ">
                                            <p>
                                                By continuing, you agree to
                                                Flipkart's Terms of Use and
                                                Privacy Policy.
                                            </p>
                                        </div>

                                        <div className="relative flex flex-col">
                                            <button className="bg-orange uppercase text-white text-[14px] font-[500] rounded-sm px-2 py-1">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;

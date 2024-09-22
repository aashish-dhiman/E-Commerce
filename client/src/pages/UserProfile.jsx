import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
    const {auth, setAuth} = useAuth();
    const [profile, setProfile] = useState(false);
    const [emailSection, setEmailSection] = useState(false);
    const [phoneSection, setPhoneSection] = useState(false);
    const [email, setEmail] = useState(auth?.user?.email);
    const [name, setName] = useState(auth?.user?.name);
    const [phone, setPhone] = useState(auth?.user?.phone);
    const [nameInputFocused, setNameInputFocused] = useState(false);

    const handleProfile = () => {
        setProfile(!profile);
    };

    const handleEmail = () => {
        setEmailSection(!emailSection);
    };

    const handlePhone = () => {
        setPhoneSection(!phoneSection);
    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        try {
            setProfile(false);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
                {
                    newName: name,
                    email: auth?.user?.email,
                }
            );
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    name: name,
                },
            });
            localStorage.removeItem("auth");
            localStorage.setItem("auth", JSON.stringify(response.data));

            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            setEmailSection(false);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
                {
                    newEmail: email,
                    email: auth?.user?.email,
                }
            );
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    email: email,
                },
            });
            localStorage.removeItem("auth");
            localStorage.setItem("auth", JSON.stringify(response.data));

            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePhoneSubmit = async (e) => {
        setPhoneSection(false);
        e.preventDefault();

        try {
            setProfile(false);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}api/v1/auth/update-details`,
                {
                    newPhone: phone,
                    email: auth?.user?.email,
                }
            );
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    phone: phone,
                },
            });
            localStorage.removeItem("auth");
            localStorage.setItem("auth", JSON.stringify(response.data));

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error:", error);
            //user not found
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidUser" &&
                toast.error("User not Found!");
            //server error
            error.response?.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.");
        }
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-start p-5 gap-10">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex gap-5">
                        <div className="font-[600] text-[16px] ">
                            Personal Information
                        </div>
                        <button
                            className="text-[14px] text-primaryBlue font-[500]"
                            onClick={handleProfile}
                        >
                            {!profile ? "Edit" : "Cancel"}
                        </button>
                    </div>
                    <div className=" h-[50px]">
                        {profile ? (
                            <form
                                action="/update-details"
                                method="post"
                                onSubmit={handleNameSubmit}
                                className="flex gap-6 items-center"
                            >
                                <div
                                    className={`border-2 p-2 flex flex-col max-h-[50px] min-h-[50px] w-[220px] ${
                                        nameInputFocused
                                            ? "border-primaryBlue border-1"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="name"
                                        className="text-[10px]"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        onFocus={() =>
                                            setNameInputFocused(true)
                                        }
                                        onBlur={() =>
                                            setNameInputFocused(false)
                                        }
                                        className=" text-[14px] focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primaryBlue text-white font-[600] w-[80px] h-[40px] px-4 py-2 rounded-sm"
                                    onClick={handleNameSubmit}
                                >
                                    Save
                                </button>
                            </form>
                        ) : (
                            <div className="border-2 p-2 w-[220px] min-h-[50px] text-slate-500 flex items-center">
                                {auth?.user?.name}
                            </div>
                        )}
                    </div>
                </div>
                {/* email section */}
                <div className="flex flex-col items-start gap-4">
                    <div className="flex gap-5">
                        <div className="font-[600] text-[16px] ">
                            Email Address
                        </div>
                        <button
                            className="text-[14px] text-primaryBlue font-[500]"
                            onClick={handleEmail}
                        >
                            {!emailSection ? "Edit" : "Cancel"}
                        </button>
                    </div>
                    <div className="flex gap-6 ">
                        {emailSection ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 p-2 w-[220px] focus:outline-primaryBlue focus:outline-1"
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
                            />
                        ) : (
                            <div className="border-2 p-2 w-[220px] text-slate-500">
                                {auth?.user?.email}
                            </div>
                        )}

                        {emailSection && (
                            <button
                                className="bg-primaryBlue text-white font-[600] w-[80px] h-[40px] px-4 py-2 rounded-sm"
                                onClick={handleEmailSubmit}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
                {/* Mobile section */}
                <div className="flex flex-col items-start gap-4">
                    <div className="flex gap-5">
                        <div className="font-[600] text-[16px] ">
                            Mobile Number
                        </div>
                        <button
                            className="text-[14px] text-primaryBlue font-[500]"
                            onClick={handlePhone}
                        >
                            {!phoneSection ? "Edit" : "Cancel"}
                        </button>
                    </div>
                    <div className="flex gap-6 ">
                        {phoneSection ? (
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-2 p-2 w-[220px] focus:outline-primaryBlue focus:outline-1"
                                inputMode="numeric" // Set input mode to numeric
                                pattern="[0-9]*" // Allow only numeric values
                                minLength="10"
                                maxLength="10"
                            />
                        ) : (
                            <div className="border-2 p-2 w-[220px] text-slate-500">
                                {auth?.user?.phone}
                            </div>
                        )}

                        {phoneSection && (
                            <button
                                className="bg-primaryBlue text-white font-[600] w-[80px] h-[40px] px-4 py-2 rounded-sm"
                                onClick={handlePhoneSubmit}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
                {/* FAQ section */}
                <div>
                    <h3 className="text-[16px] font-[600] mt-4">FAQs</h3>
                    <div className="mt-4">
                        <h5 className="text-[14px] font-[500]">
                            What happens when I update my email address (or
                            mobile number)?
                        </h5>
                        <p className="text-[12px] text-slate-500 mt-2">
                            Your login email id (or mobile number) changes,
                            likewise. You&apos;ll receive all your account
                            related communication on your updated email address
                            (or mobile number).
                        </p>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-[14px] font-[500]">
                            When will my Flipkart account be updated with the
                            new email address (or mobile number)?
                        </h5>
                        <p className="text-[12px] text-slate-500 mt-2">
                            It happens as soon as you confirm the verification
                            code sent to your email (or mobile) and save the
                            changes.
                        </p>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-[14px] font-[500]">
                            Does my Seller account get affected when I update my
                            email address?
                        </h5>
                        <p className="text-[12px] text-slate-500 mt-2">
                            Flipkart has a single sign-on policy. Any changes
                            will reflect in your Seller account also.
                        </p>
                    </div>
                </div>
                {/* deactivate account */}
                <div className="text-[14px] text-primaryBlue font-[500] mt-4 -mb-4">
                    <Link to="./deactivate">Deactivate Account</Link>
                </div>
            </div>
            {/* image section */}
            <div>
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                    alt="image"
                />
            </div>
        </div>
    );
};

export default UserProfile;

import { Route, Routes } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Deactivate from "../Auth/Deactivate";
import Reviews from "./Reviews";
import PaymentCards from "./PaymentCards";
import SeoData from "../../SEO/SeoData";

const Dashboard = () => {
    return (
        <>
            <SeoData title="User Dashboard" />
            <div className="px-[50px] py-[5px]">
                <div className="flex text-[14px] mx-[50px] my-[40px] gap-6">
                    <div className="min-w-[30%]">
                        <UserMenu />
                    </div>
                    <div className="w-[70%] bg-white shadow-md rounded-sm">
                        <Routes>
                            <Route path="" element={<UserProfile />} />
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

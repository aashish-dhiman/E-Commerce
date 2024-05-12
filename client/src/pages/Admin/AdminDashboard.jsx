import { Route, Routes } from "react-router-dom";
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

const AdminDashboard = () => {
    return (
        <>
            <SeoData title="Admin Dashboard" />
            <div className="px-[50px] py-[5px]">
                <div className="flex text-[14px] mx-[50px] my-[40px] gap-6">
                    <div className="min-w-[30%]">
                        <AdminMenu />
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

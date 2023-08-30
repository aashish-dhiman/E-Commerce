import { Route, Routes } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import SeoMetadata from "../../SEO/seoMetadata";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Orders from "./Orders";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";

const AdminDashboard = () => {
    return (
        <>
            <SeoMetadata title="Admin Dashboard" />
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
                            <Route path="orders" element={<Orders />} />
                            <Route path="users" element={<Users />} />
                            <Route path="deactivate" element={<Deactivate />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;

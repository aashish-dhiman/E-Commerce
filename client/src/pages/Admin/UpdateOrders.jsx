import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MinCategory from "../../components/MinCategory";
import axios from "axios";
import Tracker from "./../user/Orders/Tracker";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SeoData from "../../SEO/SeoData";

const UpdateOrders = () => {
    const params = useParams();
    const orderId = params.id;

    const [loading, setLoading] = useState(false);
    const [UpdateOrders, setUpdateOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [auth] = useAuth();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // fetch order detail from server
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/admin-order-detail?orderId=${orderId}`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                console.log(response.data.orderDetails);
                if (response?.data?.orderDetails) {
                    setUpdateOrders(...response.data.orderDetails);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, orderId, reload]);

    const amount = UpdateOrders?.amount;
    const orderItems = UpdateOrders?.products;
    const buyer = UpdateOrders?.buyer;
    const paymentId = UpdateOrders?.paymentId;
    const shippingInfo = UpdateOrders?.shippingInfo;
    const createdAt = UpdateOrders?.createdAt;
    const orderStatus = UpdateOrders?.orderStatus;

    const updateOrderSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log(status);
            const res = await axios.patch(
               `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update/order-status`,
                { status, orderId },
                {
                    headers: { Authorization: auth?.token },
                }
            );
            if (res.status === 200) {
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SeoData title="Order Details | Flipkart" />

            <MinCategory />
            <main className="w-full py-2 sm:py-8">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                            <div className="flex flex-col sm:flex-row bg-white shadow rounded-sm min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className=" text-md font-[600]">
                                            Delivery Address
                                        </h3>
                                        <h4 className="font-medium">
                                            {buyer?.name}
                                        </h4>
                                        <p className="text-sm">{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{buyer?.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">
                                                Phone Number
                                            </p>
                                            <p>{shippingInfo?.phoneNo}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex flex-col gap-5 my-8 mx-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className=" text-md font-[600]">
                                                Update Status
                                            </h3>
                                            <Link
                                                to="/admin/orders"
                                                className="ml-1 flex items-center gap-0 font-medium text-primaryBlue uppercase"
                                            >
                                                <ArrowBackIosIcon
                                                    sx={{ fontSize: "14px" }}
                                                />
                                                <span className="text-[12px]">
                                                    Go Back
                                                </span>
                                            </Link>
                                        </div>
                                        <div>
                                            <form
                                                onSubmit={
                                                    updateOrderSubmitHandler
                                                }
                                                className="flex flex-col gap-3 items-start justify-between"
                                            >
                                                <div className="flex gap-2">
                                                    <p className="text-sm font-medium">
                                                        Current Status:
                                                    </p>
                                                    <p className="text-sm">
                                                        {orderStatus}
                                                    </p>
                                                </div>
                                                <FormControl
                                                    fullWidth
                                                    sx={{ marginTop: 1 }}
                                                >
                                                    <InputLabel id="order-status-select-label">
                                                        Status
                                                    </InputLabel>
                                                    <Select
                                                        labelId="order-status-select-label"
                                                        id="order-status-select"
                                                        value={status}
                                                        label="Status"
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-[50%]"
                                                    >
                                                        <MenuItem
                                                            value={"Shipped"}
                                                        >
                                                            Shipped
                                                        </MenuItem>

                                                        <MenuItem
                                                            value={
                                                                "Out For Delivery"
                                                            }
                                                        >
                                                            Out For Delivery
                                                        </MenuItem>

                                                        <MenuItem
                                                            value={"Delivered"}
                                                        >
                                                            Delivered
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <button
                                                    type="submit"
                                                    className="bg-orange px-4 py-2 text-[14px] text-white hover:font-medium rounded shadow hover:shadow-lg"
                                                >
                                                    Update
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {orderItems?.map((item) => {
                                const {
                                    _id,
                                    image,
                                    name,
                                    discountPrice,
                                    quantity,
                                    seller,
                                } = item;

                                return (
                                    <div
                                        className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5"
                                        key={_id}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                            <div className="w-full sm:w-32 h-20">
                                                <img
                                                    draggable="false"
                                                    className="h-full w-full object-contain"
                                                    src={image}
                                                    alt={name}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="text-sm">
                                                    {name.length > 60
                                                        ? `${name.substring(
                                                              0,
                                                              60
                                                          )}...`
                                                        : name}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-2">
                                                    Quantity: {quantity}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Seller: {seller?.name}
                                                </p>
                                                <span className="font-medium">
                                                    ₹
                                                    {(
                                                        quantity * discountPrice
                                                    ).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    Payment Id: {paymentId}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <Tracker
                                                orderOn={createdAt}
                                                activeStep={
                                                    orderStatus === "Delivered"
                                                        ? 3
                                                        : orderStatus ===
                                                          "Out For Delivery"
                                                        ? 2
                                                        : orderStatus ===
                                                          "Shipped"
                                                        ? 1
                                                        : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </>
    );
};

export default UpdateOrders;

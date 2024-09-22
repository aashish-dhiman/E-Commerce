import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";

const DeleteAllOrder = () => {
    const {auth} = useAuth();
    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
        const fetchAllOrder = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/get-all-order`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                console.log("data:", response.data);
                setAllOrder(response.data.orders);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchAllOrder();
    }, [auth?.token]);

    return (
        <div>
            <span>{allOrder.length}</span>
            {allOrder?.map((order, i) => (
                <div
                    key={i}
                    className="p-4 mb-4 border border-gray-200 rounded-md"
                >
                    {/* Shipping Info */}
                    <h2 className="text-lg font-semibold mb-2">
                        Order {i + 1}
                    </h2>
                    <p>
                        <strong>Shipping Address:</strong>{" "}
                        {order.shippingInfo.address}
                    </p>
                    <p>
                        <strong>City:</strong> {order.shippingInfo.city}
                    </p>
                    <p>
                        <strong>State:</strong> {order.shippingInfo.state}
                    </p>
                    <p>
                        <strong>Country:</strong> {order.shippingInfo.country}
                    </p>
                    <p>
                        <strong>Pincode:</strong> {order.shippingInfo.pincode}
                    </p>
                    <p>
                        <strong>Phone No:</strong> {order.shippingInfo.phoneNo}
                    </p>

                    {/* Buyer Info */}
                    <h3 className="mt-4 text-md font-semibold">Buyer Info:</h3>
                    <p>
                        <strong>Name:</strong> {order.buyer.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {order.buyer.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {order.buyer.phone}
                    </p>

                    {/* Products */}
                    <h3 className="mt-4 text-md font-semibold">Products:</h3>
                    {order.products.map((product, index) => (
                        <div key={index} className="mt-2">
                            <p>
                                <strong>Product Name:</strong> {product.name}
                            </p>
                            <p>
                                <strong>Brand:</strong> {product.brandName}
                            </p>
                            <p>
                                <strong>Price:</strong> ₹{product.price}
                            </p>
                            <p>
                                <strong>Discounted Price:</strong> ₹
                                {product.discountPrice}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {product.quantity}
                            </p>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-32 h-32 object-cover mt-2"
                            />
                        </div>
                    ))}

                    {/* Order Status */}
                    <p className="mt-4">
                        <strong>Order Status:</strong> {order.orderStatus}
                    </p>
                    <p>
                        <strong>Total Amount:</strong> ₹{order.amount}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DeleteAllOrder;

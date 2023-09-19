/* eslint-disable react/prop-types */
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { getDeliveryDate, getDiscount } from "../../../utils/functions";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cart";
import { useState } from "react";

const CartItem = ({ product, inCart }) => {
    const [, , addItems, removeItems, , addLater] = useCart();
    // console.log(product);
    const [quantity, setQuantity] = useState(product?.quantity);

    const increaseQuantity = (product) => {
        const newQty = quantity + 1;
        if (newQty > product?.stock) {
            toast.warning("Product Stock is Limited!", {
                style: {
                    top: "40px",
                },
            });
            return;
        }
        setQuantity(newQty);
        addItems(product, newQty);
    };

    const decreaseQuantity = (product) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        setQuantity(newQty);
        addItems(product, newQty);
    };

    const removeCartItem = (product) => {
        removeItems(product);
    };

    const saveForLaterHandler = (product) => {
        // dispatch(saveForLater(id));
        addLater(product);
        // console.log("Save for later clicked");
        // enqueueSnackbar("Saved For Later", { variant: "success" });
    };

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden">
            <Link
                to={`/product/${product?.productId}`}
                className="flex flex-col sm:flex-row gap-5 items-stretch w-full "
            >
                {/* <!-- product image --> */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <img
                        draggable="false"
                        className="h-full w-full object-contain"
                        src={product?.image}
                        alt={product?.name}
                    />
                </div>
                {/* <!-- product image --> */}

                {/* <!-- description --> */}
                <div className="flex flex-col sm:gap-5 w-full ">
                    {/* <!-- product title --> */}
                    <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
                        <div className="flex flex-col gap-0.5 group sm:w-3/5">
                            <p className="group-hover:text-primaryBlue">
                                {product?.name?.length > 30
                                    ? `${product?.name?.substring(0, 30)}...`
                                    : product?.name}
                            </p>
                            <span className="text-sm text-gray-500">
                                Seller: {product?.brandName}
                            </span>
                        </div>

                        <div className="flex flex-col sm:gap-2 w-[50%]">
                            <p className="text-sm">
                                Delivery by {getDeliveryDate()} |{" "}
                                <span className="line-through">₹{40}</span>{" "}
                                <span className="text-primaryGreen">Free</span>
                            </p>
                        </div>
                    </div>
                    {/* <!-- product title --> */}

                    {/* <!-- price desc --> */}
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span className="text-sm text-gray-500 line-through font-normal">
                            ₹
                            {(
                                product?.price * product?.quantity
                            ).toLocaleString()}
                        </span>
                        <span>
                            ₹
                            {(
                                product?.discountPrice * product?.quantity
                            ).toLocaleString()}
                        </span>

                        <span className="text-sm font-[600] text-primaryGreen">
                            {getDiscount(
                                product?.price,
                                product?.discountPrice
                            )}
                            %&nbsp;off
                        </span>
                    </div>
                    {/* <!-- price desc --> */}
                </div>
                {/* <!-- description --> */}
            </Link>

            {/* <!-- save for later --> */}
            <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6">
                {/* <!-- quantity --> */}
                <div className="flex gap-2 items-center justify-between w-[130px]">
                    <span
                        onClick={() => decreaseQuantity(product)}
                        className="w-7 h-7 text-3xl font-light select-none bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                        <p>-</p>
                    </span>
                    <input
                        className="w-11 border outline-none text-center select-none rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput"
                        value={quantity}
                        disabled
                    />
                    <span
                        onClick={() => increaseQuantity(product)}
                        className="w-7 h-7 text-xl font-light select-none bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                        +
                    </span>
                </div>
                {/* <!-- quantity --> */}
                {inCart && (
                    <>
                        <button
                            onClick={() => saveForLaterHandler(product)}
                            className="sm:ml-4 font-medium hover:text-primaryBlue"
                        >
                            SAVE FOR LATER
                        </button>
                        <button
                            onClick={() => removeCartItem(product)}
                            className="font-medium hover:text-red-600"
                        >
                            REMOVE
                        </button>
                    </>
                )}
            </div>
            {/* <!-- save for later --> */}
        </div>
    );
};

export default CartItem;

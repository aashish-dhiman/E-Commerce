/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import { useEffect, useState } from "react";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Product = ({
    _id,
    images,
    name,
    ratings,
    numOfReviews,
    price,
    discountPrice,
    wishlistItems,
    setWishlistItems,
}) => {
    const { auth, isAdmin } = useAuth();

    //check if item is present in user wishlist or not
    const itemInWishlist = wishlistItems?.some((itemId) => {
        return itemId === _id;
    });

    // Optimistic UI update
    const updateWishlistUI = (add) => {
        setWishlistItems((prev) =>
            add ? [...prev, _id] : prev.filter((item) => item !== _id)
        );
    };

    // add to wishlist function
    const addToWishlistHandler = async () => {
        const type = itemInWishlist ? "remove" : "add";
        try {
            // Update the UI before the API call
            updateWishlistUI(type === "add");

            const res = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update-wishlist`,
                { productId: _id, type },
                { headers: { Authorization: auth.token } }
            );
        } catch (error) {
            console.error(error);
            if (error.message.includes("403")) {
                toast.error(
                    "Admins are not allowed to add items to the wishlist",
                    {
                        toastId: "error",
                    }
                );
            } else {
                toast.error("Something went wrong! Please try again later.", {
                    toastId: "error",
                });
            }
            // Revert UI update if there is an error
            updateWishlistUI(type !== "add");
        }
    };

    return (
        <>
            <ScrollToTopOnRouteChange />
            <div className="relative">
                {/* <!-- wishlist badge --> */}
                <span
                    onClick={addToWishlistHandler}
                    className={`${
                        itemInWishlist
                            ? "text-red-500"
                            : "hover:text-red-500 text-gray-300"
                    }
                    ${isAdmin ? "hidden" : ""}
                    absolute z-10  top-2 right-3 cursor-pointer`}
                >
                    <FavoriteIcon sx={{ fontSize: "20px" }} />
                </span>
                {/* <!-- wishlist badge --> */}
                <div className="flex flex-col items-center gap-2 w-full px-4 py-6 relative hover:shadow-lg rounded-sm">
                    {/* <!-- image & product title --> */}
                    <Link
                        to={`/product/${_id}`}
                        className="flex flex-col items-center w-full text-center group"
                    >
                        <div className="w-44 h-48">
                            <img
                                draggable="false"
                                className="w-full h-full object-contain"
                                src={images && images[0]?.url}
                                alt={name}
                            />
                        </div>
                    </Link>
                    {/* <!-- image & product title --> */}

                    {/* <!-- product description --> */}
                    <div className="flex flex-col gap-2 items-start w-full">
                        <h2 className="text-sm leading-6 font-[500] mt-4 group-hover:text-primary-blue text-left">
                            {name.length > 25
                                ? `${name.substring(0, 25)}...`
                                : name}
                        </h2>
                        {/* <!-- rating badge --> */}
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-start justify-between">
                            <span className="text-xs px-1.5 py-0.5 bg-[#22ba20] rounded-sm text-white flex items-center gap-0.5">
                                {ratings.toFixed(1)}
                                <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews})</span>
                            <span>
                                <img
                                    draggable="false"
                                    className="w-[60px] h-[20px] ml-4 object-contain"
                                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                    alt={name}
                                />
                            </span>
                        </span>
                        {/* <!-- rating badge --> */}

                        {/* <!-- price container --> */}
                        <div className="flex items-center gap-1.5 text-md font-medium">
                            <span>₹{discountPrice.toLocaleString()}</span>
                            <span className="text-gray-500 line-through text-xs">
                                ₹{price.toLocaleString()}
                            </span>
                            <span className="text-xs text-primary-green">
                                {getDiscount(price, discountPrice)}%&nbsp;off
                            </span>
                        </div>
                        {/* <!-- price container --> */}
                    </div>
                    {/* <!-- product description --> */}
                </div>
            </div>
        </>
    );
};

export default Product;

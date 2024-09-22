import { useState, useEffect } from "react";
import Product from "./Product";
import MinCategory from "../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import SeoData from "../../../SEO/SeoData";

const Wishlist = () => {
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 5; // Number of items per page

    useEffect(() => {
        // Fetch wishlist count and product details
        const fetchWishlist = async (page) => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/wishlist-products?page=${page}&pageSize=${pageSize}`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                const newItems = res.data.wishlistItems;
                // append new items in state
                setWishlistItems((prev) => [...prev, ...newItems]);
                setCount(res?.data?.totalItems);
                setIsLoading(false);
                setIsLoadMore(false);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };
        auth.token && !isAdmin && fetchWishlist(page); // Fetch initial page
    }, [page, auth.token, isAdmin]);

    // Fetch more wishlist items when "Load more" is clicked
    const handleLoadMore = () => {
        setIsLoadMore(true);
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            if (nextPage <= Math.ceil(count / pageSize)) {
                return nextPage;
            }
            return prevPage;
        });
    };

    // Remove item from wishlist
    const updateWishlist = async (productId) => {
        try {
            setIsLoading(true);
            await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update-wishlist`,
                { productId, type: "remove" },
                { headers: { Authorization: auth.token } }
            );
            toast.success("Product Removed From Wishlist");
            setWishlistItems((prev) =>
                prev.filter((item) => item._id !== productId)
            );
            setCount((prev) => prev - 1);
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <>
            <SeoData title="My Wishlist" />
            <MinCategory />

            {isLoading && page === 1 ? (
                <Spinner />
            ) : (
                <div className="flex gap-3.5 w-full sm:w-11/12 sm:mt-4 m-auto pb-7">
                    <div className="flex-1 shadow bg-white">
                        {/* Wishlist container */}
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                                My Wishlist ({count})
                            </span>

                            {wishlistItems.length === 0 ? (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <img
                                        draggable="false"
                                        className="object-contain"
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
                                        alt="Empty Wishlist"
                                    />
                                    <span className="text-lg font-medium mt-6">
                                        Empty Wishlist
                                    </span>
                                    <p>
                                        You have no items in your wishlist.
                                        Start adding!
                                    </p>
                                </div>
                            ) : (
                                wishlistItems.map((item, index) => (
                                    <Product
                                        {...item}
                                        func={updateWishlist}
                                        key={index}
                                    />
                                ))
                            )}

                            {count > wishlistItems.length && (
                                <span className="font-medium text-md px-4 sm:px-8 py-4 flex items-center justify-center border-b">
                                    <button
                                        onClick={handleLoadMore}
                                        className="text-primaryBlue"
                                        disabled={isLoadMore}
                                    >
                                        {isLoadMore
                                            ? "Loading..."
                                            : "Load more items"}
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Wishlist;

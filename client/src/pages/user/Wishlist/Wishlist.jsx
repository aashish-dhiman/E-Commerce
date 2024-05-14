import { useState, useEffect } from "react";
import Product from "./Product";
import MinCategory from "./../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import SeoData from "../../../SEO/SeoData";

const Wishlist = () => {
    const [auth] = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // Number of items per page
    let _id;

    const fetchCounts = async () => {
        try {
            // only id of wishlist products will get
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            setCount(res.data.wishlistItems?.length);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    };
    useEffect(() => {
        fetchCounts();
    }, []);

    // to fetch details of wishlist products

    const fetchDetails = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist-products?page=${page}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            const newItems = response.data.wishlistItems;
            setWishlistItems((prev) => [...new Set([...prev, ...newItems])]);
            setIsLoading(false);
            setIsLoadMore(false);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    };
    useEffect(() => {
        fetchDetails();
    }, [page]);
    // console.log(wishlistItems);

    const handleLoadMore = () => {
        // Increment the page number to fetch the next batch
        setIsLoadMore(true);
        setPage((prevPage) => {
            if (Math.ceil(count / pageSize) > prevPage) {
                return (prevPage = prevPage + 1);
            } else {
                return prevPage;
            }
        });
    };

    const updateWishlist = async (productId) => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
                {
                    productId: productId,
                    type: "remove",
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            // console.log(res);
            res.status === 201 &&
                toast.success("Product Removed From Wishlist") &&
                setWishlistItems((prev) =>
                    prev.filter((item) => item._id !== _id)
                );
            setIsLoading(false);
            fetchCounts();
            fetchDetails();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = (productId) => {
        updateWishlist(productId);
        _id = productId;
    };
    return (
        <>
            <SeoData title="My Wishlist" />
            <MinCategory />

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="flex gap-3.5 w-full sm:w-11/12 sm:mt-4 m-auto pb-7">
                    <div className="flex-1 shadow bg-white">
                        {/* <!-- wishlist container --> */}
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                                My Wishlist ({count})
                            </span>

                            {wishlistItems.length === 0 && (
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
                            )}

                            {wishlistItems
                                ?.map((item, index) => (
                                    <Product
                                        {...item}
                                        func={deleteHandler}
                                        key={index}
                                    />
                                ))
                                .reverse()}

                            {count > pageSize && (
                                <span className="font-medium text-md px-4 sm:px-8 py-4 flex items-center justify-center border-b">
                                    <button
                                        onClick={handleLoadMore}
                                        className="text-primaryBlue "
                                    >
                                        {isLoadMore
                                            ? "Loading..."
                                            : "Load more items"}
                                    </button>
                                </span>
                            )}
                        </div>
                        {/* <!-- wishlist container --> */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Wishlist;

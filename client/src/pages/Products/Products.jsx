/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import MinCategory from "../../components/MinCategory";
import Product from "../../components/ProductListing/Product";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { useAuth } from "../../context/auth";

const Products = () => {
    const location = useLocation();
    const { auth, isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState([0, 200000]);
    // console.log(location.search);
    const [category, setCategory] = useState(
        location.search ? location.search.split("=")[1] : ""
    );
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    // pagination----->
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(products?.length);
    const productsPerPage = 8;
    // Calculate the total number of pages
    const totalPages = Math.ceil(productsCount / productsPerPage);
    // Calculate the range of products to display on the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    //updating the products to display on current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        toast(
            "The backend is starting up, please wait for a minute if the loader is visible."
        );

        //fetching filtered products from sever
        const fetchFilteredData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/filtered-products`,
                    {
                        params: {
                            category: category,
                            priceRange: [
                                parseInt(price[0].toFixed()),
                                parseInt(price[1].toFixed()),
                            ],
                            ratings: ratings,
                        },
                    }
                );
                // console.log(res.data);

                res.status === 404 &&
                    toast.error("No Products Found!", {
                        toastId: "productNotFound",
                    });

                res.status === 201 && setProducts(res.data.products);
                setLoading(false);
                setProductsCount(res.data.products.length);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);

                //server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime.",
                        {
                            toastId: "error",
                        }
                    );
            }
        };
        fetchFilteredData();
    }, [price, category, ratings]);

    useEffect(() => {
        // getting user wishlist items from server
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error(
                    "Error fetching data from wishlist product page:",
                    error
                );
                //server error
                error.response?.status === 500 &&
                    toast.error("Error in Fetching Wishlist Items!", {
                        toastId: "error",
                    });
            }
        };
        auth?.token && !isAdmin && fetchWishlistItems();
    }, [auth?.token, isAdmin]);

    return (
        <>
            <SeoData title="All Products | Flipkart" />

            <MinCategory />
            <main className="w-full pt-2 pb-5 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto ">
                    {/* <!-- sidebar column  --> */}
                    <SideFilter
                        price={price}
                        category={category}
                        ratings={ratings}
                        setPrice={setPrice}
                        setCategory={setCategory}
                        setRatings={setRatings}
                    />
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1 relative ">
                        {/* No products found */}
                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-start gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16 sm:min-h-[750px] ">
                                <img
                                    draggable="true"
                                    className="w-1/2 h-44 object-contain"
                                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                                    alt="Search Not Found"
                                />
                                <h1 className="text-2xl font-medium text-gray-900">
                                    Sorry, no results found!
                                </h1>
                                <p className="text-xl text-center text-primary-grey">
                                    Please check the spelling or try searching
                                    for something else.
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <Spinner />
                        ) : (
                            products?.length !== 0 && (
                                <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 min-h-[750px] ">
                                        {currentProducts?.map((product) => (
                                            <Product
                                                key={product._id}
                                                {...product}
                                                wishlistItems={wishlistItems}
                                                setWishlistItems={
                                                    setWishlistItems
                                                }
                                            />
                                        ))}
                                    </div>
                                    {productsCount > productsPerPage && (
                                        <Pagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default Products;

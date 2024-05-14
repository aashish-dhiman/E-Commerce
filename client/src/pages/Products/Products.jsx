/* eslint-disable react/jsx-key */
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import MinCategory from "../../components/MinCategory";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";

const Products = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState([0, 200000]);
    // console.log(location.search);
    const [category, setCategory] = useState(
        location.search ? location.search.split("=")[1] : ""
    );
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);

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
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    };

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setRatings(0);
    };
    useEffect(() => {
        //fetching filtered products from sever
        const fetchFilteredData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/filtered-products`,
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

    return (
        <>
            <SeoData title="All Products | Flipkart" />

            <MinCategory />
            <main className="w-full pt-2 pb-5 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto ">
                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">
                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">
                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span
                                    className="uppercase text-primaryBlue text-xs cursor-pointer font-medium"
                                    onClick={() => clearFilters()}
                                >
                                    clear all
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">
                                {/* price slider filter */}
                                <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">
                                        PRICE
                                    </span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() =>
                                            "Price range slider"
                                        }
                                        min={0}
                                        max={200000}
                                    />

                                    <div className="flex gap-3 items-center mb-2 ">
                                        <span className="flex-1  min-w-[70px] border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                                            ₹{price[0].toLocaleString()}
                                        </span>
                                        <span className="font-medium text-gray-400">
                                            to
                                        </span>
                                        <span className="flex-1 min-w-[70px] border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                                            ₹{price[1].toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                                        onClick={() =>
                                            setCategoryToggle(!categoryToggle)
                                        }
                                    >
                                        <p className="font-medium text-xs uppercase">
                                            Category
                                        </p>
                                        {categoryToggle ? (
                                            <ExpandLessIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        ) : (
                                            <ExpandMoreIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        )}
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) =>
                                                        setCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel
                                                            value={el}
                                                            key={i}
                                                            control={
                                                                <Radio size="small" />
                                                            }
                                                            label={
                                                                <span
                                                                    className="text-sm"
                                                                    key={i}
                                                                >
                                                                    {el}
                                                                </span>
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col border-b px-4 -mb-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                                        onClick={() =>
                                            setRatingsToggle(!ratingsToggle)
                                        }
                                    >
                                        <p className="font-medium text-xs uppercase">
                                            ratings
                                        </p>
                                        {ratingsToggle ? (
                                            <ExpandLessIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        ) : (
                                            <ExpandMoreIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        )}
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) =>
                                                        setRatings(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3, 2, 1].map(
                                                        (el, i) => (
                                                            <FormControlLabel
                                                                value={el}
                                                                key={i}
                                                                control={
                                                                    <Radio size="small" />
                                                                }
                                                                label={
                                                                    <span className="flex items-center text-sm">
                                                                        {el}
                                                                        <StarIcon
                                                                            sx={{
                                                                                fontSize:
                                                                                    "12px",
                                                                                mx: 0.5,
                                                                            }}
                                                                        />
                                                                        & above
                                                                    </span>
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* ratings filter */}
                            </div>
                        </div>
                        {/* <!-- nav tiles --> */}
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1 relative ">
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
                                    for something else
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <Spinner />
                        ) : products?.length !== 0 ? (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 min-h-[750px] ">
                                    {currentProducts?.map((product) => (
                                        <Product
                                            {...product}
                                            key={product._id}
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
                        ) : (
                            ""
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

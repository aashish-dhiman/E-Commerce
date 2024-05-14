import { BsSearch } from "react-icons/bs";
import debounce from "lodash.debounce";
import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const handleSearch = async (query) => {
        try {
            const products = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }api/v1/product/search/${query}`
            );
            // console.log(products);
            setResults(products.data.slice(0, 6));
            setOpen(true);
            console.log(results);
        } catch (error) {
            console.error("Error searching for products:", error);
        }
    };

    // Debounce the handleSearch function with a 300ms delay
    const debouncedSearch = debounce(handleSearch, 300);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Call the debouncedSearch function instead of handleSearch directly
        debouncedSearch(newQuery);
    };

    //aliter- using use effect-
    //  useEffect(() => {
    //      const delayDebounceFn = setTimeout(() => {
    //          // Call the search function after a delay of 300 milliseconds
    //          handleSearch(query);
    //      }, 300);

    //      // Cleanup the timeout if the user continues typing
    //      return () => clearTimeout(delayDebounceFn);
    //  }, [query, handleSearch]);

    return (
        <>
            <div
                className="w-[100%] sm:w-[70%] relative flex flex-col items-center search-container"
                onBlur={() =>
                    setTimeout(() => {
                        setOpen(false);
                    }, 500)
                }
            >
                <form
                    action="/search"
                    method=""
                    className="bg-[#f0f5ff] relative w-[100%] rounded-md"
                >
                    <div className="flex items-center h-[40px] ">
                        <div className=" flex items-center px-2">
                            <button type="submit">
                                <figure className=" text-slate-500 bg-transparent">
                                    <BsSearch />
                                </figure>
                            </button>
                        </div>
                        <div className="w-[100%]">
                            <input
                                type="text"
                                title="Search for Products, Brands and More"
                                placeholder="Search for Products, Brands and More"
                                autoComplete="off"
                                className=" bg-transparent w-[100%] border-none outline-none text-[14px] md:text-[16px] p-1 placeholder-gray-600 "
                                onChange={handleInputChange}
                                value={query}
                            />
                        </div>
                    </div>
                </form>
                {results.length > 0 && open && (
                    <ul className="absolute top-[40px] left-0 right-0 pb-2 z-50 w-full bg-white shadow-lg rounded-b-md">
                        {results.map((product) => (
                            <li key={product?._id}>
                                <a
                                    href={`/product/${product._id}`}
                                    className="px-5 py-4 h-[50px] hover:bg-[#f0f5ff] flex gap-5"
                                >
                                    <img
                                        src={product?.images[0].url}
                                        alt="product"
                                        className="w-5 h-5"
                                    />
                                    <span>
                                        {product?.name?.length > 40
                                            ? `${product?.name?.substring(
                                                  0,
                                                  40
                                              )}...`
                                            : product?.name}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SearchBar;

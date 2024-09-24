import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../../utils/constants";
import Spinner from "../../components/Spinner";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "./../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";

const EditProduct = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);
    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState();
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: "",
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [warranty, setWarranty] = useState();
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [oldLogo, setOldLogo] = useState();
    const [removedImages, setRemovedImages] = useState([]);
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");

    //for submit state
    const [isSubmit, setIsSubmit] = useState(false);

    // max image size 500kb
    const MAX_IMAGE_SIZE = 500 * 1024;
    const MAX_IMAGES_COUNT = 4; // Maximum number of allowed images

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() && !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };

    const addHighlight = () => {
        if (!highlightInput?.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file.size > MAX_IMAGE_SIZE) {
            toast.warning("Logo image size exceeds 500 KB!");
            return;
        }

        if (oldLogo)
            setRemovedImages((prev) => {
                return [...prev, oldLogo.public_id];
            });
        setOldLogo(null);
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        // if more than 4 images then show warning
        if (files.length > MAX_IMAGES_COUNT) {
            toast.warning("You can only upload up to 4 images");
            return;
        }

        files.forEach((file) => {
            // check for image size
            if (file.size > MAX_IMAGE_SIZE) {
                toast.warning("One of the product images exceeds 500 KB");
                // Skip the file if it exceeds the size limit
                return;
            }
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductUpdateHandler = async (e) => {
        e.preventDefault();

        setIsSubmit(true);

        const validationErrors = [];

        if (specs.length <= 1) {
            validationErrors.push("Please Add Minimum 2 Specifications");
        }

        if (oldImages.length <= 0 && images.length <= 0) {
            validationErrors.push("Please Add Atleast 1 Product Image");
        }

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.warning(error));
            setIsSubmit(false); // Disable submission due to validation errors
            return;
        }
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discountPrice", discountPrice);
            formData.append("category", category);
            formData.append("stock", stock);
            formData.append("warranty", warranty);
            formData.append("brandName", brand);
            formData.append("logo", logo);
            formData.append("oldLogo", JSON.stringify(oldLogo));

            images.forEach((image) => {
                formData.append("images", image);
            });

            highlights.forEach((h) => {
                formData.append("highlights", h);
            });

            specs.forEach((s) => {
                formData.append("specifications", JSON.stringify(s));
            });

            formData.append("oldImages", JSON.stringify(oldImages));
            // oldImages.forEach((image) => {
            // });

            removedImages.forEach((image) => {
                formData.append("removedImages", image);
            });

            // send a put request to replace data on server
            const response = await axios.patch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product/update/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: auth?.token,
                    },
                }
            );
            // console.log(response);
            // on success->
            response.status === 201 &&
                toast.success("Product Updated Successfully!");
            navigate("/admin/dashboard/all-products");
        } catch (error) {
            console.error("Error:", error);
            setIsSubmit(false);
            //server error
            error.response.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.");
        }
    };

    useEffect(() => {
        // Request for prefilled values from the server
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/${productId}`
                );

                // Update state with fetched product data
                setName(res.data.product.name);
                setDescription(res.data.product.description);
                setPrice(res.data.product.price);
                setDiscountPrice(res.data.product.discountPrice);
                setCategory(res.data.product.category);
                setStock(res.data.product.stock);
                setWarranty(res.data.product.warranty);
                setBrand(res.data.product.brand.name);
                setHighlights(res.data.product.highlights || []);
                setSpecs(res.data.product.specifications || []);
                setOldLogo(() => {
                    return {
                        url: res.data.product.brand.logo.url,
                        public_id: res.data.product.brand.logo.public_id,
                    };
                });
                {
                    res.data.product.images.map((image) => {
                        setOldImages((prevImages) => [
                            ...prevImages,
                            { url: image.url, public_id: image.public_id },
                        ]);
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);

                // Server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try again later."
                    );
            }
        };
        // Initial call to fetch data from the server
        fetchData();
    }, [productId]);

    return (
        <>
            <SeoData title="New/Update Product | Flipkart" />
            <ScrollToTopOnRouteChange />

            {isSubmit || loading ? (
                <div className="relative h-full">
                    <Spinner />
                </div>
            ) : (
                <form
                    onSubmit={newProductUpdateHandler}
                    encType="multipart/form-data"
                    className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-2 sm:p-4"
                    id="mainForm"
                >
                    <div className="flex flex-col flex-1 gap-3 m-2 ">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={2}
                            required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex gap-2 justify-between">
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                label="Discount Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                required
                                value={discountPrice}
                                onChange={(e) =>
                                    setDiscountPrice(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((el, i) => (
                                    <MenuItem value={el} key={i}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Stock"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            <TextField
                                label="Warranty"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                required
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center border rounded">
                                <input
                                    value={highlightInput}
                                    onChange={(e) =>
                                        setHighlightInput(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Highlight"
                                    className="px-2 flex-1 outline-none border-none"
                                />
                                <span
                                    onClick={() => addHighlight()}
                                    className="py-2 px-6 bg-primaryBlue text-white rounded-r hover:shadow-lg cursor-pointer"
                                >
                                    Add
                                </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {highlights?.map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between rounded items-center py-1 px-2 bg-green-50"
                                    >
                                        <p className="text-green-800 text-sm font-medium">
                                            {h}
                                        </p>
                                        <span
                                            onClick={() => deleteHighlight(i)}
                                            className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                                        >
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="font-medium">Brand Details</h2>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
                            <TextField
                                label="Brand"
                                type="text"
                                variant="outlined"
                                size="small"
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <div className="w-24 h-10 flex items-center justify-center border rounded-lg relative">
                                {oldLogo ? (
                                    <img
                                        draggable="false"
                                        src={oldLogo.url}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                ) : !logoPreview ? (
                                    <ImageIcon />
                                ) : (
                                    <img
                                        draggable="false"
                                        src={logoPreview}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                <span className="text-red-500 absolute -top-1 -right-[90px]">
                                    *
                                    <span className=" text-[10px] text-gray-500">
                                        (max 500KB)
                                    </span>
                                </span>
                            </div>
                            <label className="rounded bg-primaryBlue text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                                Choose Logo
                            </label>
                        </div>

                        <h2 className="font-medium">
                            Specifications{" "}
                            <span className="text-xs text-gray-500">
                                (at least 2 required)
                            </span>
                        </h2>

                        <div className="flex justify-between gap-2 items-center">
                            <TextField
                                value={specsInput.title}
                                onChange={handleSpecsChange}
                                name="title"
                                label="Name"
                                placeholder="Model No."
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                value={specsInput.description}
                                onChange={handleSpecsChange}
                                name="description"
                                label="Description"
                                placeholder="WJDK42DF5"
                                variant="outlined"
                                size="small"
                            />
                            <span
                                onClick={() => addSpecs()}
                                className="py-2 px-6 bg-primaryBlue text-white rounded hover:shadow-lg cursor-pointer"
                            >
                                Add
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {specs?.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between gap-2 sm:gap-5 items-center text-sm rounded bg-blue-50 py-1 px-2"
                                >
                                    <p className="text-gray-500 font-medium">
                                        {spec.title}
                                    </p>
                                    <p>{spec.description}</p>
                                    <span
                                        onClick={() => deleteSpec(i)}
                                        className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-medium">
                            Product Images{" "}
                            <span className="ml-2 text-xs text-gray-500">
                                (1-4 images, max 500KB each)
                            </span>
                        </h2>
                        <div className="flex gap-2 overflow-x-auto h-36 border rounded bg-gray-200 p-2">
                            {imagesPreview?.map((image, i) => (
                                <img
                                    draggable="false"
                                    src={image}
                                    alt="Product Image"
                                    key={i}
                                    className="w-24 h-24 object-contain"
                                />
                            ))}
                            {oldImages?.map((image, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        draggable="false"
                                        src={image.url}
                                        alt="Product"
                                        className="w-24 h-24 object-contain transition-opacity duration-300 group-hover:opacity-20"
                                    />
                                    <div
                                        onClick={() => {
                                            setOldImages((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item?.url !== image?.url
                                                )
                                            );
                                            setRemovedImages((prev) => [
                                                ...prev,
                                                image?.public_id,
                                            ]);
                                        }}
                                        className="absolute text-red-500 text-center top-0 right-0 w-full h-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <span>Remove</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <label className="rounded font-medium bg-primaryBlue text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleProductImageChange}
                                className="hidden"
                            />
                            Choose Files
                        </label>

                        <div className="flex  items-center gap-4 justify-between">
                            <input
                                form="mainForm"
                                type="submit"
                                className="bg-orange uppercase w-full p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                                value="Update"
                            />
                            <Link
                                to="/admin/dashboard/all-products"
                                className="bg-red-600 uppercase w-full p-3 text-white text-center font-medium rounded shadow hover:shadow-lg cursor-pointer"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
export default EditProduct;

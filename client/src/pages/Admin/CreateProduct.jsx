import TextField from "@mui/material/TextField";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../../utils/constants";
import Spinner from "../../components/Spinner";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "./../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";

const CreateProduct = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
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

    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");

    //for submit state
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() && !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
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

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [
                        ...oldImages,
                        reader.result,
                    ]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductSubmitHandler = async (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setIsSubmit(true);
        try {
            // required field checks
            if (!logo) {
                toast.warning("Please Add Brand Logo");
                return;
            }
            if (specs.length <= 1) {
                toast.warning("Please Add Minimum 2 Specifications");
                return;
            }
            if (images.length <= 0) {
                toast.warning("Please Add Product Images");
                return;
            }
            console.log("Name:", name);
            console.log("Description:", description);
            console.log("Price:", price);
            console.log("Images Array:", images);
            console.log("logo:", logo);
            console.log("Specs Array:", specs);

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

            images.forEach((image) => {
                formData.append("images", image);
            });

            highlights.forEach((h) => {
                formData.append("highlights", h);
            });

            specs.forEach((s) => {
                formData.append("specifications", JSON.stringify(s));
            });
            console.log([...formData]);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/new-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: auth?.token,
                    },
                    // header: { "Content-Type": "application/json" },
                }
            );
            // console.log(response);
            // on success->
            response.status === 201 &&
                toast.success("Product Added Successfully!");
            navigate("/admin/dashboard/all-products");
        } catch (error) {
            console.error("Error:", error);
            setIsSubmit(false);
            //server error
            error.response.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.");
        }
    };

    return (
        <>
            <SeoData title="New Product | Flipkart" />
            <ScrollToTopOnRouteChange />

            {isSubmit ? (
                <div className="relative h-full">
                    <Spinner />
                </div>
            ) : (
                <form
                    onSubmit={newProductSubmitHandler}
                    encType="multipart/form-data"
                    className="flex flex-col w-full sm:flex-row bg-white rounded-lg shadow p-4"
                    id="mainForm"
                >
                    <div className="flex flex-col mx-auto py-2 gap-3 m-2 w-[90%] ">
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
                                {highlights.map((h, i) => (
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
                        <div className="flex justify-between gap-4 items-start">
                            <TextField
                                label="Brand"
                                type="text"
                                variant="outlined"
                                size="small"
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                                {!logoPreview ? (
                                    <ImageIcon />
                                ) : (
                                    <img
                                        draggable="false"
                                        src={logoPreview}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                )}
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

                        <h2 className="font-medium">Specifications</h2>

                        <div className="flex justify-evenly gap-2 items-center">
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
                            {specs.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2"
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

                        <h2 className="font-medium">Product Images</h2>
                        <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                            {imagesPreview.map((image, i) => (
                                <img
                                    draggable="false"
                                    src={image}
                                    alt="Product"
                                    key={i}
                                    className="w-full h-full object-contain"
                                />
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

                        <div className="flex justify-end">
                            <input
                                form="mainForm"
                                type="submit"
                                className="bg-orange uppercase w-full p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                                value="Submit"
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
export default CreateProduct;

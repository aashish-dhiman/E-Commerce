/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDiscount } from "../../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const Product = (props) => {
    const {
        _id,
        name,
        price,
        discountPrice,
        images,
        ratings,
        numOfReviews,
        func,
    } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteProduct = async () => {
        setIsDeleting(true);
        try {
            // Make the delete request here
            await func(_id);
        } catch (error) {
            // Handle any errors if necessary
        } finally {
            setIsDeleting(false);
        }
    };
    // Check if 'images' is defined before rendering
    const shouldRenderImage = images && images.length > 0;

    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            <div className="w-1/6 h-28 flex-shrink-0">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={shouldRenderImage ? images[0].url : ""}
                    alt={name}
                />
            </div>

            {/* <!-- description --> */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* <!-- product title --> */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link
                        to={`/product/${_id}`}
                        className="flex flex-col gap-0.5"
                    >
                        <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">
                            {name?.length > 70
                                ? `${name?.substring(0, 70)}...`
                                : name}
                        </p>
                        {/* <!-- rating badge --> */}
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-[#22ba20] rounded-sm text-white flex items-center gap-0.5">
                                {ratings} <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews?.toLocaleString()})</span>
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
                    </Link>
                    <button
                        onClick={deleteProduct}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <span>
                            <DeleteIcon />
                        </span>
                    </button>
                </div>
                {/* <!-- product title --> */}

                {/* <!-- price desc --> */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span>₹{discountPrice?.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through font-normal mt-1">
                        ₹{price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#22ba20] mt-1">
                        {getDiscount(price, discountPrice)}%&nbsp;off
                    </span>
                </div>
                {/* <!-- price desc --> */}
            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;

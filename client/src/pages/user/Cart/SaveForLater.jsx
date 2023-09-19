/* eslint-disable react/prop-types */
import { getDiscount } from "../../../utils/functions";
import { useCart } from "../../../context/cart";

const SaveForLaterItem = ({ product }) => {
    const [, , , , saveLaterItems, addLater, moveToCart, removeLater] =
        useCart();

    const removeFromSaveForLaterHandler = (product) => {
        removeLater(product);
    };

    const moveToCartHandler = (product,quantity) => {
        moveToCart(product,quantity);
    };

    return (
        <div
            className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b "
            key={product.productId}
        >
            <div
                className="flex flex-col sm:flex-row gap-5 items-stretch w-full"
                href="#"
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
                <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
                    {/* <!-- product title --> */}
                    <div className="flex justify-between items-start pr-5">
                        <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
                            <p>
                                {product?.name?.length > 50
                                    ? `${product?.name?.substring(0, 50)}...`
                                    : product?.name}
                            </p>
                            <span className="text-sm text-gray-500">
                                Seller: {product?.brandName}
                            </span>
                        </div>
                    </div>
                    {/* <!-- product title --> */}

                    {/* <!-- price desc --> */}
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span>
                            ₹
                            {(
                                product?.price * product?.quantity
                            ).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through font-normal">
                            ₹
                            {(
                                product?.discountPrice * product?.quantity
                            ).toLocaleString()}
                        </span>
                        <span className="text-sm text-primary-green">
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
            </div>

            {/* <!-- move to cart --> */}
            <div className="flex justify-evenly sm:justify-start sm:gap-6">
                {/* <!-- quantity --> */}
                <div className="flex gap-2 items-center justify-between w-[130px]">
                    <span
                        
                        className="w-7 h-7 text-3xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                        <p>-</p>
                    </span>
                    <input
                        className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput"
                        value={product?.quantity}
                        disabled
                    />
                    <span
                        
                        className="w-7 h-7 text-xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                        +
                    </span>
                </div>
                {/* <!-- quantity --> */}
                <button
                    onClick={() =>
                        moveToCartHandler(product, product?.quantity)
                    }
                    className="sm:ml-4 font-medium hover:text-primaryBlue"
                >
                    MOVE TO CART
                </button>
                <button
                    onClick={() => removeFromSaveForLaterHandler(product)}
                    className="font-medium hover:text-red-600"
                >
                    REMOVE
                </button>
            </div>
            {/* <!-- move to cart --> */}
        </div>
    );
};

export default SaveForLaterItem;

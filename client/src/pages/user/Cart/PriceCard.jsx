/* eslint-disable react/prop-types */
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const PriceCard = ({ cartItems }) => {
    // console.log(cartItems);
    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <h1 className="px-6 py-3 border-b font-medium text-gray-500">
                    PRICE DETAILS
                </h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between">
                        Price ({cartItems?.length} item){" "}
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        item.discountPrice * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Discount{" "}
                        <span className="text-primary-green">
                            - ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.price * item.quantity -
                                            item.discountPrice * item.quantity),
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Delivery Charges{" "}
                        <span className="text-primary-green">FREE</span>
                    </p>

                    <div className="border border-dashed"></div>
                    <p className="flex justify-between text-lg font-medium">
                        Total Amount{" "}
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        item.discountPrice * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <div className="border border-dashed"></div>

                    <p className="font-medium text-primaryGreen">
                        You will save ₹
                        {cartItems
                            .reduce(
                                (sum, item) =>
                                    sum +
                                    (item.price * item.quantity -
                                        item.discountPrice * item.quantity),
                                0
                            )
                            .toLocaleString()}{" "}
                        on this order
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center my-4 p-2 ">
                <VerifiedUserIcon className="text-gray-600" />
                <p className="text-gray-500 w-full text-[14px] font-[500]">
                    Safe and Secure Payments.Easy returns.100% Authentic
                    products.
                </p>
            </div>
            {/* <!-- nav tiles --> */}
        </div>
    );
};

export default PriceCard;

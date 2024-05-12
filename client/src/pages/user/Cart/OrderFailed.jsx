import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SeoData from "../../../SEO/SeoData";

const OrderFailed = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);
    //after order place remove items from cart

    useEffect(() => {
        if (time === 0) {
            navigate("/cart");
            return;
        }
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [time]);

    return (
        <>
            <SeoData title={`Transaction Failed`} />

            <main className="w-full p-8">
                {/* <!-- row --> */}
                <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 m-auto  bg-white shadow rounded p-6 min-h-[60vh]">
                    <div className=" flex gap-4 items-center">
                        <h1 className="text-2xl font-semibold">
                            Transaction Failed
                        </h1>
                        <ErrorOutlineIcon className="text-red-600" />
                    </div>
                    <p className="mt-4 text-lg text-gray-800">
                        Redirecting to cart in {time} sec
                    </p>
                    <Link
                        to="/cart"
                        className="bg-primaryBlue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm"
                    >
                        go to cart
                    </Link>
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default OrderFailed;

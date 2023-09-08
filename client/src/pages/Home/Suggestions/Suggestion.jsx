/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { settings } from "../DealSlider/DealSlider";
import Product from "./Product";
import { offerProducts } from "../../../utils/constants";
import { getRandomProducts } from "../../../utils/functions";

const Suggestion = ({ title, tagline }) => {
    return (
        <section className="bg-white w-full p-0 shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-[22px] font-[500]">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                <Link
                    to="/products"
                    className="bg-primaryBlue text-[12px] sm:text-[16px] font-medium text-white  px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-sm hover:shadow-md uppercase"
                >
                    view all
                </Link>
            </div>
            <hr />

            <Slider
                {...settings}
                className="flex items-center justify-between p-1"
            >
                {offerProducts &&
                    getRandomProducts(offerProducts, 12).map((product, i) => (
                        <Product {...product} key={i} />
                    ))}
            </Slider>
        </section>
    );
};

export default Suggestion;

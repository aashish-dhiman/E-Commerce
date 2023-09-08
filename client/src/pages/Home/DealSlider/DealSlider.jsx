import Product from "./Product";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../Banner/Banner";
import { Link } from "react-router-dom";
import { offerProducts } from "../../../utils/constants";
import { getRandomProducts } from "../../../utils/functions";

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const DealSlider = ({ title }) => {
    return (
        <section className="bg-white w-full shadow p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
                {/* Left Side */}
                <div className="flex flex-row md:flex-col gap-6 w-[100%] px-6 pt-8 md:w-[20%] justify-between items-center">
                    <h1 className="text-[22px] font-medium">{title}</h1>
                    <Link
                        to="/products"
                        className="bg-primaryBlue text-[12px] sm:text-[16px] font-medium text-white  px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-sm hover:shadow-md"
                    >
                        VIEW ALL
                    </Link>
                </div>

                {/* Right Side (Slider) */}
                <Slider className="w-[100%] md:w-[80%]" {...settings}>
                    {getRandomProducts(offerProducts, 12).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default DealSlider;

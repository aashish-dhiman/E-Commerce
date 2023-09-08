/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import oppo from "../../../assets/images/Banners/oppo-reno7.webp";
import samsung from "../../../assets/images/Banners/samsung.jpeg";
import infinix from "../../../assets/images/Banners/infinix.jpeg";
import flight from "../../../assets/images/Banners/flight.jpeg";
import flight2 from "../../../assets/images/Banners/flight2.jpeg";
import laptop from "../../../assets/images/Banners/laptop.png";
import mattress from "../../../assets/images/Banners/mattress.jpg";
import iphone from "../../../assets/images/Banners/iphone.jpg";

export const PreviousBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const Banner = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const banners = [
        iphone,
        laptop,
        flight,
        samsung,
        infinix,
        mattress,
        oppo,
        flight2,
    ];

    return (
        <>
            <section className="w-full rounded-sm shadow p-0 overflow-hidden mt-3 sm:m-2">
                <Slider {...settings}>
                    {banners.map((el, i) => (
                        <img
                            draggable="false"
                            className="h-[150px] sm:h-[280px] w-full object-cover "
                            src={el}
                            alt="banner"
                            key={i}
                        />
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Banner;

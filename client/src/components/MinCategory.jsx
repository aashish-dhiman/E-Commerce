import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const categories = [
    "Electronics",
    "TVs & Appliances",
    "Men",
    "Women",
    "Baby & Kids",
    "Home & Furniture",
    "Sports, Books & More",
    "Flights",
    "Offer Zone",
    "Grocery",
];

const MinCategory = () => {
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:p-0 overflow-hidden border-b">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                    <Link
                        to="/products"
                        key={i}
                        className="text-sm p-2 text-gray-800 font-medium hover:text-primaryBlue flex items-center gap-0.5 group"
                    >
                        {el}
                        <span className="text-gray-400 group-hover:text-primaryBlue group-hover:rotate-180 transition-all ease-out">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;

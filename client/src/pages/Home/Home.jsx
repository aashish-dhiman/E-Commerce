import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductsListing/ProductSlider";
import { electronicProducts } from "../../utils/electronics";
import { accessories } from "../../utils/accessories";
import { fashionProducts } from "../../utils/fashion";
import { applianceProducts } from "../../utils/appliances";
import { furnitureProducts } from "../../utils/furniture";
import electronics from "../../assets/images/electronics-card.jpg";
import accessoryCard from "../../assets/images/accessory-card.jpg";
import fashionCard from "../../assets/images/fashion-card.jpg";
import applianceCard from "../../assets/images/appliance-card.jpg";
import furnitureCard from "../../assets/images/furniture-card.jpg";
import Suggestion from "./Suggestions/Suggestion";
import SeoData from "../../SEO/SeoData";

const Home = () => {
    // const [auth, setAuth] = useAuth();
    return (
        <>
            <SeoData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
            <ScrollToTopOnRouteChange />
            <Categories />
            <main className="flex flex-col items-center gap-3 px-2 pb-5 sm:mt-2">
                {/* <pre className="min-h-[60vh]">
                    {JSON.stringify(auth, null, 3)}
                </pre> */}
                <Banner />
                <DealSlider title={"Discounts for You"} />
                <ProductSlider
                    title={"Best of Electronics"}
                    products={electronicProducts}
                    logo={electronics}
                />
                <ProductSlider
                    title={"Beauty, Toys & More"}
                    products={accessories}
                    logo={accessoryCard}
                />
                <Suggestion
                    title={"Suggested for You"}
                    tagline={"Based on Your Activity"}
                />

                <ProductSlider
                    title={"Fashion Top Deals"}
                    products={fashionProducts}
                    logo={fashionCard}
                />
                <ProductSlider
                    title={"TVs & Appliances"}
                    products={applianceProducts}
                    logo={applianceCard}
                />
                <ProductSlider
                    title={"Furniture & More"}
                    products={furnitureProducts}
                    logo={furnitureCard}
                />
            </main>
        </>
    );
};

export default Home;

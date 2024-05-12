/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

const SeoMetadata = ({ title, description, keywords }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
);

SeoMetadata.defaultProps = {
    title: "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!",
    description: "Flipkart online shopping platform clone by Aashish Dhiman",
    keywords: ["shopping", "react project", "mern project", "nodejs", "online"],
};

export default SeoMetadata;

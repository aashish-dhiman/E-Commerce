import productModel from "../../models/productModel.js";

const getFilteredProducts = async (req, res) => {
    try {
        // Extract parameters from the request query
        const { category, priceRange, ratings } = req.query;

        let products = await productModel.find({}).sort({ createdAt: -1 });
        if (category) {
            products = products.filter(
                (product) => product.category === category
            );
        }

        if (priceRange && priceRange.length === 2) {
            const [minPrice, maxPrice] = priceRange;
            products = products.filter(
                (product) =>
                    product.price >= minPrice && product.price <= maxPrice
            );
        }

        if (ratings) {
            const minRatings = Number(ratings);
            products = products.filter(
                (product) => product.ratings >= minRatings
            );
        }

        if (!products) {
            return res.status(404).send({
                success: false,
                message: "No Products Found!",
                errorType: "productNotFound",
            });
        }
        res.status(201).send({ success: true, products });
    } catch (error) {
        console.log("Filter Products Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in getting Filtered Products",
            error,
        });
    }
};

export default getFilteredProducts;

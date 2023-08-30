import productModel from "../../models/productModel.js";
const getSellerProducts = async (req, res) => {
    try {
        const products = await productModel.find({ seller: req.user._id });
        if (!products) {
            return res.status(401).send({
                success: false,
                message: "No Products Found!",
                errorType: "productNotFound",
            });
        }
        res.status(201).send({ success: true, products });
    } catch (error) {
        console.log("New Product Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in getting All Products",
            error,
        });
    }
};

export default getSellerProducts;

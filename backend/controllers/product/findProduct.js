import productModel from "../../models/productModel.js";

const findProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const response = await productModel.findById(productId);
        // console.log(response);
        // if no response -? product don't exist
        !response &&
            res.status(401).send({
                success: false,
                errorType: "productNotFound",
                message: "Product Not Found",
            });
        response &&
            res.status(201).send({
                success: true,
                message: "Product Fetched Successfully",
                product: response,
            });
    } catch (error) {
        console.log("Find Product Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Finding Product",
            error,
        });
    }
};
export default findProduct;

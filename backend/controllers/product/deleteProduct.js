import productModel from "../../models/productModel.js";

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId);

        const response = await productModel.findByIdAndDelete(productId);
        console.log(response);
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
                message: "Product Deleted Successfully",
            });
    } catch (error) {
        console.log("New Product Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Deleting Product",
            error,
        });
    }
};
export default deleteProduct;

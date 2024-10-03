import productModel from "../../models/productModel.js";
import userModel from "../../models/userModel.js";
import orderModel from "../../models/orderModel.js"; // Assuming you have an order model

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        // Step 1: Delete the product from the product model
        const response = await productModel.findByIdAndDelete(productId);

        if (!response) {
            return res.status(401).send({
                success: false,
                errorType: "productNotFound",
                message: "Product Not Found",
            });
        }

        // Step 2: Remove the product from all users' wishlists
        await userModel.updateMany(
            { wishlist: productId }, // Find users with this product in their wishlist
            { $pull: { wishlist: productId } } // Pull the product out of the wishlist array
        );

        // Step 3: Remove the product from order history (if applicable)
        await orderModel.updateMany(
            { "products.productId": productId }, // Find orders containing this product
            { $pull: { products: { productId } } } // Pull the product from the products array
        );

        // Step 4: Send success response
        res.status(201).send({
            success: true,
            message:
                "Product Deleted Successfully and removed from wishlists and order history",
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

import userModel from "../../models/userModel.js";
import mongoose from "mongoose";

const updateCartItems = async (req, res) => {
    try {
        const { productId } = req.body;

        const user = await userModel.findById(req.user._id);
        // console.log(productId);

        if (user) {
            console.log("User's Cart Items: ", user.cartItems);
            console.log("Request Product ID: ", productId);

            user.cartItems = user.cartItems.filter((item) => {
                const itemProductId = item.productId.toString();
                const reqProductId = productId.toString();
                console.log("Item Product ID: ", itemProductId);
                console.log(
                    "Comparison Result: ",
                    item.productId === reqProductId
                );
                return item.productId !== reqProductId;
            });
            
            await user.save();
            res.status(201).send({
                success: true,
            });
            // console.log(user);
        }
    } catch (error) {
        console.log("Error in Removing Cart Items: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Removing Cart Items",
            error,
        });
    }
};
export default updateCartItems;

import productModel from "../../models/productModel.js";
import userModel from "../../models/userModel.js";

const getCartItems = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        // console.log(req.user._id);
        // console.log(user.cartItems);
        if (!user) {
            console.log("User Not Exist");
        }

        res.status(201).send({
            success: true,
            cartItems: user.cartItems,
        });
    } catch (error) {
        console.log("Error in Getting Cart Items: " + error);
        res.status(500).send({
            success: false,
            message: "Error in getting Cart Items",
            error,
        });
    }
};
export default getCartItems;

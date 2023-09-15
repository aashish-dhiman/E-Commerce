import userModel from "../../models/userModel.js";

const updateCartItems = async (req, res) => {
    try {
        const {
            productId,
            name,
            stock,
            image,
            brandName,
            price,
            discountPrice,
            quantity,
        } = req.body;

        const user = await userModel.findById(req.user._id);
        // console.log(user);

        if (user) {
            user.cartItems.unshift({
                productId,
                name,
                stock,
                image,
                brandName,
                price,
                discountPrice,
                quantity,
            });
            await user.save();
            res.status(201).send({
                success: true,
            });
            console.log(user);
        }
    } catch (error) {
        console.log("Error in Getting Cart Items: " + error);
        res.status(500).send({
            success: false,
            message: "Error in getting Cart Items",
            error,
        });
    }
};
export default updateCartItems;

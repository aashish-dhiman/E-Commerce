import userModel from "../../models/userModel.js";

const getWishlistItems = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        // console.log(user);
        const wishlistItems = user.wishlist;
        // console.log(wishlistItems);
        res.status(201).send({
            success: true,
            wishlistItems,
        });
    } catch (error) {
        console.log("Error in Getting Wishlist Products: " + error);
        res.status(500).send({
            success: false,
            message: "Error in getting Wishlist Products",
            error,
        });
    }
};
export default getWishlistItems;

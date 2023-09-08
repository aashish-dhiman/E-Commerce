import userModel from "../../models/userModel.js";
import productModel from "../../models/productModel.js";

const getWishlistProducts = async (req, res) => {
    try {
        const { user } = req;
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 5; // Number of items per page

        // Calculate the skip value based on the page number
        const skip = (page - 1) * pageSize;

        // Fetch wishlist items for the user with pagination
        const userWithWishlist = await userModel.findById(user._id).populate({
            path: "wishlist", // Populate the "wishlist" field with product IDs
            options: { skip, limit: pageSize }, // Apply pagination
            model: productModel, // The product model
        });

        const wishlistItems = userWithWishlist.wishlist;

        res.status(200).send({ success: true, wishlistItems });
    } catch (error) {
        console.error("Error fetching wishlist items:", error);
        res.status(500).json({ error: "Error fetching wishlist items" });
    }
};
export default getWishlistProducts;

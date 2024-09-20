import userModel from "../../models/userModel.js";
import productModel from "../../models/productModel.js";

const getWishlistProducts = async (req, res) => {
    try {
        const { user } = req;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5; // Number of items per page

        // Calculate the skip value based on the page number
        const skip = (page - 1) * pageSize;

        // Fetch the total count of wishlist items
        const userWishlistCount = await userModel
            .findById(user._id)
            .select("wishlist")
            .lean();
        const totalItems = userWishlistCount?.wishlist?.length || 0;

        // Fetch wishlist items for the user with pagination
        const userWithWishlist = await userModel.findById(user._id).populate({
            path: "wishlist", // Populate the "wishlist" field with product details
            options: { skip, limit: pageSize }, // Apply pagination
            model: productModel,
        });

        const wishlistItems = userWithWishlist.wishlist;

        res.status(200).json({
            success: true,
            wishlistItems,
            totalItems,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.error("Error fetching wishlist items:", error.message);
        res.status(500).json({
            error: "Internal server error while fetching wishlist items",
        });
    }
};

export default getWishlistProducts;

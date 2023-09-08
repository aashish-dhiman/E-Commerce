import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import getWishlistItems from "../controllers/user/getWishlistItems.js";
import updateWishlist from "../controllers/user/updateWishlist.js";
import getWishlistProducts from "../controllers/user/getWishlistProducts.js";

//router object
const router = express.Router();

//routing
//get Wishlist Items id
router.get("/wishlist", requireSignIn, getWishlistItems);

//update wishlist Items
router.post("/update-wishlist", requireSignIn, updateWishlist);

// get wishlist products
router.get("/wishlist-products", requireSignIn, getWishlistProducts);


export default router;

import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import getWishlistItems from "../controllers/user/getWishlistItems.js";
import updateWishlist from "../controllers/user/updateWishlist.js";
import getWishlistProducts from "../controllers/user/getWishlistProducts.js";
import getCartItems from "../controllers/user/getCartItems.js";
import updateCartItems from "../controllers/user/updateCartItems.js";
import removeCartItems from "../controllers/user/removeCartItems.js";

//router object
const router = express.Router();

//routing
//get Wishlist Items id
router.get("/wishlist", requireSignIn, getWishlistItems);

//update wishlist Items
router.post("/update-wishlist", requireSignIn, updateWishlist);

// get wishlist products
router.get("/wishlist-products", requireSignIn, getWishlistProducts);

//get cart items
router.get("/cart", requireSignIn, getCartItems);
router.post("/add-cart", requireSignIn, updateCartItems);
router.post("/remove-cart", requireSignIn, removeCartItems);

export default router;

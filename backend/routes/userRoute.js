import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import getWishlistItems from "../controllers/user/getWishlistItems.js";
import updateWishlist from "../controllers/user/updateWishlist.js";
import getWishlistProducts from "../controllers/user/getWishlistProducts.js";
import createSession from "../controllers/user/createSession.js";
import handleSuccess from "../controllers/user/handleSuccess.js";
import getOrders from "../controllers/user/getOrders.js";
import getOrderDetail from "../controllers/user/getOrderDetail.js";

//router object
const router = express.Router();

//routing
//get Wishlist Items id
router.get("/wishlist", requireSignIn, getWishlistItems);

//update wishlist Items
router.post("/update-wishlist", requireSignIn, updateWishlist);

// get wishlist products
router.get("/wishlist-products", requireSignIn, getWishlistProducts);

// checkout session - stripe payment
router.post("/create-checkout-session", createSession);
router.post("/payment-success", requireSignIn, handleSuccess);

// get user orders
router.get("/orders", requireSignIn, getOrders);
router.get("/order-detail", requireSignIn, getOrderDetail);

export default router;

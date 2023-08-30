import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import newProduct from "../controllers/product/newProduct.js";
import getSellerProducts from "../controllers/product/getSellerProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";

//router object
const router = express.Router();

//Add new product POST
router.post("/new-product", requireSignIn, isAdmin, newProduct);

//Get Seller Product
router.get("/seller-product", requireSignIn, isAdmin, getSellerProducts);

//Delete Product
router.post("/delete-product",deleteProduct)

export default router;

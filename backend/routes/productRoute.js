import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import newProduct from "../controllers/product/newProduct.js";
import getSellerProducts from "../controllers/product/getSellerProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import findProduct from "../controllers/product/findProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";

//router object
const router = express.Router();

//Add new product POST
router.post("/new-product", isAdmin, newProduct);

//Get Seller Product
router.get("/seller-product", isAdmin, getSellerProducts);

//Delete Product
router.post("/delete-product", deleteProduct);

//find product details from product id
router.get("/:id", findProduct);

//update product details from product id
router.put("/update/:id", isAdmin, updateProduct);

export default router;

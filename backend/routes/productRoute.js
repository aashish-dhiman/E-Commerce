import express from "express";
import newProduct from "../controllers/newProduct.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//Add new product POST
router.post("/new-product", requireSignIn, isAdmin, newProduct);

export default router;

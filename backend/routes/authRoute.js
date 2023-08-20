import express from "express";
import {
    registerController,
    loginController,
    userCheckController,
    forgotPasswordController,
    testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//USER EXIST || METHOD POST
router.post("/user-exist", userCheckController);

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route-user
router.get("/user-auth", requireSignIn, (req, res) => {
    try {
        res.status(200).send({
            ok: true,
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;

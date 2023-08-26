import express from "express";
import {
    registerController,
    loginController,
    userCheckController,
    forgotPasswordController,
    updateDetailsController,
    deactivateController
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

//protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    try {
        res.status(200).send({
            ok: true,
        });
    } catch (error) {
        console.log(error);
    }
});

// update details POST route\
router.post("/update-details", updateDetailsController);

// deactivate account
router.post("/deactivate", deactivateController);

export default router;

import { hashPassword, comparePassword } from "../../helper/authHelper.js";
import userModel from "../../models/userModel.js";

// POST Forgot Password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Checking the EMAIL and PASSWORD
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
                errorType: "invalidCredentials",
            });
        }

        //FINDING THE USER
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Registered!",
                errorType: "invalidUser",
            });
        }
        const newPassword = await hashPassword(password);

        //IF USER EXISTS-
        const response = await userModel.findOneAndUpdate(
            { email: email },
            {
                password: newPassword,
            }
        );

        //SUCCESS RESPONSE
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully!",
            response,
        });
    } catch (error) {
        console.log("Forgot Password Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Forgot Password",
            error,
        });
    }
};

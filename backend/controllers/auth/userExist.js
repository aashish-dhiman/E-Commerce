import userModel from "../../models/userModel.js";

//USER EXIST
export const userCheckController = async (req, res) => {
    try {
        const { email } = req.body;

        //Checking the EMAIL and PASSWORD
        if (!email) {
            return res.status(401).send({
                success: false,
                message: "Invalid username",
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

        //SUCCESS RESPONSE
        res.status(200).send({
            success: true,
            message: "User Found!",
        });
    } catch (error) {
        console.log("User Check Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in User Checking",
            error,
        });
    }
};

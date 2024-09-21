import userModel from "../../models/userModel.js";

// Update Details controller
export const updateDetailsController = async (req, res) => {
    try {
        const { newName, newEmail, newPhone, email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Found!",
                errorType: "invalidUser",
            });
        }
        if (newName) {
            const response = await userModel.findOneAndUpdate(
                { email: email },
                {
                    name: newName,
                }
            );
            res.status(200).send({
                success: true,
                message: "Name Updated Successfully!",
            });
        }
        if (newEmail) {
            const response = await userModel.findOneAndUpdate(
                { email: email },
                {
                    email: newEmail,
                }
            );
            res.status(200).send({
                success: true,
                message: "Email Updated Successfully!",
            });
        }
        if (newPhone) {
            const response = await userModel.findOneAndUpdate(
                { email: email },
                {
                    phone: newPhone,
                }
            );
            res.status(200).send({
                success: true,
                message: "Mobile Number Updated Successfully!",
            });
        }

        //SUCCESS RESPONSE
    } catch (error) {
        console.log("Update Details Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Updating Details",
            error,
        });
    }
};

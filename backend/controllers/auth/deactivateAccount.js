import userModel from "../../models/userModel.js";
//account Deactivate
export const deactivateController = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Found!",
                errorType: "invalidUser",
            });
        }
        phone === user.phone && (await userModel.deleteOne({ email: email }))
            ? res.status(200).send({
                  success: true,
                  message: "Account Deleted Successfully!",
              })
            : res.status(401).send({
                  success: true,
                  message: "Mobile Number does not match!",
                  errorType: "phoneMismatch",
              });
    } catch (error) {
        console.log("Deactivation Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Deactivating Account",
            error,
        });
    }
};

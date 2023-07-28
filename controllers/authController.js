import { hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //setup validations
        if (!name) res.send({ error: "Name is Required" });
        if (!email) res.send({ error: "Email is Required" });
        if (!password) res.send({ error: "Password is Required" });
        if (!phone) res.send({ error: "Mobile No. is Required" });
        if (!address) res.send({ error: "Address is Required" });

        //check for existing users
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Email already registered! Please Login...",
            });
        }

        //Register User
        const hashedPassword = await hashPassword(password);
        console.log("hashed Password:", hashedPassword);

        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
        });
        user.save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully!",
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

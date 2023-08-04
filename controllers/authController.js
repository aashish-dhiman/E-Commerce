import { hashPassword, comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//POST REGISTER
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

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Checking the EMAIL and PASSWORD
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }

        //FINDING THE USER
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Registered!",
            });
        }

        //IF USER EXISTS-CHECKING THE PASSWORD
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password!",
            });
        }

        //TOKEN
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //SUCCESS RESPONSE
        res.status(200).send({
            success: true,
            message: "LoggedIn Successfully!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.log("Login error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};

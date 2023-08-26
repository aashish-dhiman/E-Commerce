import { hashPassword, comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//POST REGISTER
export const registerController = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;

        //setup validations
        if (!name) res.send({ message: "Name is Required" });
        if (!email) res.send({ message: "Email is Required" });
        if (!password) res.send({ message: "Password is Required" });
        if (!phone) res.send({ message: "Phone No. is Required" });
        if (!address) res.send({ message: "Address is Required" });

        //check for existing users
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already registered!",
                errorType: "emailConflict",
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

        //IF USER EXISTS-CHECKING THE PASSWORD
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password!",
                errorType: "invalidPassword",
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
            message: "Logged in Successfully!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
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
        console.log(email, newPassword);
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

// Update Details controller
export const updateDetailsController = async (req, res) => {
    try {
        const { newName, newEmail, newPhone, email } = req.body;
        console.log(req.body);
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

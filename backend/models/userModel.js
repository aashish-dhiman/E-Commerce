import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        pan: {
            number: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
       
        
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

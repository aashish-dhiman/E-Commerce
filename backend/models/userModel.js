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
        cartItems: [
            {
                name: {
                    type: String,
                },
                stock: {
                    type: Number,
                },
                image: {
                    type: String,
                },
                brandName: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                discountPrice: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                productId: {
                    type: String,
                    required: true,
                },
            },
        ],
        orders: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    default: 1,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

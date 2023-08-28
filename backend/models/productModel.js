import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    highlights: [
        {
            type: String,
            required: true,
        },
    ],
    specifications: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter offer price"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    brand: {
        name: {
            type: String,
            required: true,
        },
        logo: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed limit"],
        default: 1,
    },
    warranty: {
        type: Number,
        default: 1,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],

    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Product", productSchema);

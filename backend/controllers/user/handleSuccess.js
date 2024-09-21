import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
import orderModel from "../../models/orderModel.js";
import mongoose from "mongoose";
import productModel from "../../models/productModel.js";

const handleSuccess = async (req, res) => {
    try {
        // Retrieve the session ID from the query parameters
        const { sessionId, orderItems } = req.body;
        console.log("sessionId, orderItems: ", sessionId, orderItems);

        // Fetch the payment intent associated with the session
        const session = await stripeInstance.checkout.sessions.retrieve(
            sessionId
        );
        console.log("session: ", session);

        // Extract the payment intent ID from the retrieved session
        const paymentIntentId = session.payment_intent;
        const amount = session.amount_total;
        const orderObject = orderItems?.map((product) => ({
            name: product.name,
            image: product.image,
            brandName: product.brandName,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: product.quantity,
            productId: new mongoose.Types.ObjectId(product.productId),
            seller: new mongoose.Types.ObjectId(product.seller),
        }));
        const shippingObject = {
            address: session?.customer_details?.address?.line1,
            city: session?.customer_details?.address?.city,
            state: session?.customer_details?.address?.state,
            country: session?.customer_details?.address?.country,
            pincode: session?.customer_details?.address?.postal_code,
            phoneNo: session?.customer_details?.phone || "Not Provided", // Provide a fallback if phone is null
            landmark:
                session?.customer_details?.address?.line2 || "No Landmark", // Provide a fallback if line2 is null
        };
        
        // Payment successful, save payment details to your database
        const combinedOrder = {
            paymentId: paymentIntentId,
            products: orderObject,
            buyer: req.user._id,
            shippingInfo: shippingObject,
            amount: amount / 100,
        };
        const order = new orderModel(combinedOrder);
        await order.save();
        
        // Reduce stock for each product
        for (const item of orderItems) {
            const product = await productModel.findById(item?.productId);
            if (product) {
                product.stock -= item?.quantity;
                await product.save();
            } else {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
        }

        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error in handling payment success:", error);
        res.status(500).send("Error in handling payment success");
    }
};

export default handleSuccess;

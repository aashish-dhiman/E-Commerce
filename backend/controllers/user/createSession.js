import stripe from "stripe";
// to resolve stripe secret key error again use dotenv here
import dotenv from "dotenv";
dotenv.config();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const createSession = async (req, res) => {
    try {
        const { products, frontendURL } = req.body;
        // console.log(frontendURL);
        const successPath = "/shipping/confirm";
        const cancelPath = "/shipping/failed";

        const successURL = frontendURL + successPath;
        const cancelURL = frontendURL + cancelPath;
        // console.log(successURL, cancelURL);
        const lineItems = products?.map((item) => ({
            price_data: {
                currency: "inr",
                //price goes in decimal so we have to multiply by 100
                unit_amount: item.discountPrice * 100,
                product_data: {
                    name: item?.name,
                },
            },
            quantity: item.quantity,
        }));
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: successURL,
            cancel_url: cancelURL,
        });

        res.send({ session: session });
    } catch (error) {
        console.log("Error in creating stripe session id: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Payment Gateway",
            error,
        });
    }
};
export default createSession;

import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getOrders = async (req, res) => {
    try {
        const { orderId } = req.query;
        const orderDetails = await orderModel
            .find({ _id: orderId })
            .populate({ path: "buyer", model: userModel })
            .populate({ path: "products.seller", model: userModel });
        console.log(orderDetails);

        res.status(200).send({
            success: true,
            orderDetails: orderDetails,
        });
    } catch (error) {
        console.error("Error in getting Order Details:", error);
        res.status(500).send("Error in getting order details");
    }
};

export default getOrders;

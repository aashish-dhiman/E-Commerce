import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getOrders = async (req, res) => {
    try {
        const order = await orderModel
            .find({ buyer: req.user._id })
            .populate({ path: "buyer", model: userModel })
            .populate({ path: "products.seller", model: userModel });

        res.status(200).send({
            success: true,
            orders: order,
        });
    } catch (error) {
        console.error("Error in getting Orders:", error);
        res.status(500).send("Error in getting orders");
    }
};

export default getOrders;

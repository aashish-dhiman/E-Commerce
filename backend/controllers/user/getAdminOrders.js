import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getAdminOrders = async (req, res) => {
    try {
        const order = await orderModel.find({
            "products.seller": req.user._id,
        });

        res.status(200).send({
            success: true,
            orders: order,
        });
    } catch (error) {
        console.error("Error in getting Orders:", error);
        res.status(500).send("Error in getting orders");
    }
};

export default getAdminOrders;

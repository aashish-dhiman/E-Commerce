import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const updateOrder = async (req, res) => {
    try {
        const { status, orderId } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { orderStatus: status },
            { new: true }
        );

        if (updateOrder) {
            res.status(200).send({
                success: true,
            });
        }
    } catch (error) {
        console.error("Error in updating Order Details:", error);
        res.status(500).send("Error in updating order details");
    }
};

export default updateOrder;

import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getAllUserOrder = async (req, res) => {
    try {
        const order = await orderModel
            .find({})
            .populate({ path: "buyer", model: userModel })
            .populate({ path: "products.seller", model: userModel });

        res.status(200).send({
            success: true,
            orders: order,
        });
    } catch (error) {
        console.error("Error in getting all user Orders:", error);
        res.status(500).send("Error in getting all user orders");
    }
};

export default getAllUserOrder;

// const deleteUserOrder = async (req, res) => {
//     try {
//         // Fetch the latest 20 orders
//         const orders = await orderModel
//             .find({})
//             .sort({ createdAt: -1 })
//             .limit(78);

//         // Delete the orders one by one
//         await Promise.all(
//             orders.map(async (order) => {
//                 await orderModel.deleteOne({ _id: order._id });
//             })
//         );

//         console.log("Deleted orders: ", orders);
//         // Send a response
//         // res.status(200).send({
//         //     success: true,
//         //     message: "Orders deleted successfully",
//         // });
//     } catch (error) {
//         console.error("Error in deleting all user Orders:", error);
//         // res.status(500).send("Error in deleting all user orders");
//     }
// };

// // deleteUserOrder();

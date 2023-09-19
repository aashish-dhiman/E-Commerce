import productModel from "../../models/productModel.js";

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        // console.log(keyword);

        // Use MongoDB's $regex operator for a case-insensitive search
        const products = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        });
        res.status(200).json(products);
    } catch (error) {
        console.log("Filter Products Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Searching Products",
            error,
        });
    }
};
export default searchProductController;

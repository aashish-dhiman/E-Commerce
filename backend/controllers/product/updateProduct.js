import productModel from "../../models/productModel.js";
import cloudinary from "cloudinary";

const updateProduct = async (req, res) => {
    try {
        // console.log(req.body);
        const productId = req.params.id;
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLink = [];

        for (let i = 0; i < images?.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        let brandLogo = null; // Initialize brandLogo as null

        if (req.body.logo) {
            // Check if a new logo is provided
            const result = await cloudinary.v2.uploader.upload(req.body.logo, {
                folder: "brands",
            });

            brandLogo = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        req.body.brand = {
            name: req.body.brandName,
            logo: brandLogo, // Use the uploaded logo or null
        };

        req.body.images = imagesLink;
        req.body.seller = req.user._id;

        let specs = [];
        req.body.specifications.forEach((s) => {
            specs.push(JSON.parse(s));
        });
        req.body.specifications = specs;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(401).send({
                success: false,
                message: "No Product Found",
                errorType: "productNotFound",
            });
        }

        //destroy already saved images in cloudinary
        let publicIdToDelete = [];
        req.body.oldImages.map((item) => {
            if (!publicIdToDelete.includes(item)) {
                publicIdToDelete.push(item);
            }
        });

        publicIdToDelete.map((id) => {
            cloudinary.v2.uploader
                .destroy(id)
                .then((result) =>
                    console.log(
                        "Cloudinary Deleting Image:" + JSON.stringify(result)
                    )
                );
        });

        //set the new product
        product.set(req.body);

        const updatedProduct = await product.save();
        // console.log(updatedProduct);
        res.status(201).send({
            success: true,
            updatedProduct,
        });
    } catch (error) {
        console.log("Updating Product Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in Updating New Product",
            error,
        });
    }
};

export default updateProduct;

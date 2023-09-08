import productModel from "../../models/productModel.js";
import cloudinary from "cloudinary";

const newProduct = async (req, res) => {
    // console.log(req.body);
    try {
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
        req.body.logo
        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        const brandLogo = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        req.body.brand = {
            name: req.body.brandName,
            logo: brandLogo,
        };
        req.body.images = imagesLink;
        req.body.seller = req.user._id;

        let specs = [];
        req.body.specifications.forEach((s) => {
            specs.push(JSON.parse(s));
        });
        req.body.specifications = specs;

        const product = await productModel.create(req.body);

        res.status(201).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log("New Product Error: " + error);
        res.status(500).send({
            success: false,
            message: "Error in adding New Product",
            error,
        });
    }
};

export default newProduct;

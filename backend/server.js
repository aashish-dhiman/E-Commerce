//packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

//local imports
import connectDB from "./config/database.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

//rest object
const app = express();

//configure env
dotenv.config();

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// to send large files 
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);
// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect DB
connectDB();

//port
const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to E-Commerce App</h1>");
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

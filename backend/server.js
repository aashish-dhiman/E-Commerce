//packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

//local imports
import connectDB from "./config/database.js";
import authRoute from "./routes/authRoute.js";

//rest object
const app = express();

//configure env
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//connect DB
connectDB();

//port
const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to E-Commerce App</h1>");
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

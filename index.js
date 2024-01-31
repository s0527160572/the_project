import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import mongodb from "mongodb";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import cors from "cors";


import { connectToDb } from "./config/dbConfig.js";
import { errorHandling } from "./midelWares/errMidel.js";

config();
connectToDb();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:3001", methods: "*" }));

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.use(errorHandling);


let port = process.env.PORT || 3500;
app.listen(port, () => { console.log(`app is listenning on port ${port}`) })
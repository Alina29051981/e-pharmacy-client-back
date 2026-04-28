// src/index.js

import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors as celebrateErrors } from "celebrate";
import productRoutes from "./routes/productRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";
import { logger } from "./middleware/logger.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("❌ Missing JWT secrets in .env");
}

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/shop", productRoutes);
app.use("/api/statistics", statisticsRoutes);

app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

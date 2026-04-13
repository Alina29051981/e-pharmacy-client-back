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

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

// 📌 ROUTES
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/shop", productRoutes);
app.use("/api/statistics", statisticsRoutes);

// 📌 ERRORS (ПРАВИЛЬНИЙ ПОРЯДОК)
app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// src/index.js

import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors as celebrateErrors } from "celebrate";

import productRoutes from "./routes/productRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

import { logger } from "./middleware/logger.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

/**
 * 🔐 Перевірка критичних env змінних
 */
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("❌ Missing JWT secrets in .env");
}

const app = express();

/**
 * 🌍 CORS (важливо для production)
 */
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

/**
 * 🧩 Middleware
 */
app.use(cookieParser());
app.use(express.json());
app.use(logger);

/**
 * 🚏 Routes
 */
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/shop", productRoutes);
app.use("/api/statistics", statisticsRoutes);

/**
 * ⚠️ Error handling
 */
app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * 🚀 Server start only after DB connection
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectMongoDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

startServer();

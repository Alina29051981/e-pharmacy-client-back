// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectMongoDB } from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

/**
 * =====================
 * CORE MIDDLEWARE
 * =====================
 */
app.use(cors());
app.use(express.json());

/**
 * =====================
 * DB CONNECTION
 * =====================
 */
connectMongoDB();

/**
 * =====================
 * ROUTES
 * =====================
 */
app.use("/api/user", authRoutes);

/**
 * =====================
 * TEST ROUTE
 * =====================
 */
app.get("/", (req, res) => {
    res.send("Server running");
});

/**
 * =====================
 * ERROR HANDLER (LAST)
 * =====================
 */
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

// src/index.js

import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use("/api/user", authRoutes);

app.use(express.json());
app.use(cors());

app.use(authRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

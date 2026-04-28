// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(createError(401, "No token"));
        }

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById(payload.userId);

        if (!user) return next(createError(401, "User not found"));

        req.user = user;

        next();
    } catch {
        next(createError(401, "Unauthorized"));
    }
};

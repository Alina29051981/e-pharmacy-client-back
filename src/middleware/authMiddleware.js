// src/middleware/authMiddleware.js

import createError from "http-errors";
import { Session } from "../models/session.js";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const accessToken =
            req.cookies?.accessToken ||
            (authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null);

        if (!accessToken) {
            return next(createError(401, "No access token provided"));
        }

        const session = await Session.findOne({ accessToken });

        if (!session) {
            return next(createError(401, "Session not found"));
        }

        const isAccessTokenExpired =
            new Date() > new Date(session.accessTokenValidUntil);

        if (isAccessTokenExpired) {
            return next(createError(401, "Access token expired"));
        }

        const user = await User.findById(session.userId);

        if (!user) {
            return next(createError(401, "User not found"));
        }

        req.user = user;
        req.session = session;

        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        next(createError(401, "Unauthorized"));
    }
};

import createError from "http-errors";
import { Session } from "../models/session.js";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken =
            req.cookies?.accessToken ||
            (req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);

        if (!accessToken) {
            return next(createError(401, "No token provided"));
        }

        const session = await Session.findOne({ accessToken });

        if (!session) {
            return next(createError(401, "Session not found"));
        }

        const isExpired = new Date() > new Date(session.accessTokenValidUntil);

        if (isExpired) {
            return next(createError(401, "Access token expired"));
        }

        const user = await User.findById(session.userId);

        if (!user) {
            return next(createError(401, "User not found"));
        }

        req.user = user;
        req.session = session;

        next();
    } catch {
        next(createError(401, "Unauthorized"));
    }
};

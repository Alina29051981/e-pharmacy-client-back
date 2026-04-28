// src/middleware/checkRole.js;
import createError from "http-errors";

export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(createError(401, "Unauthorized"));
        }

        const role = req.user.role;

        if (!allowedRoles.includes(role)) {
            return next(
                createError(403, "Forbidden: insufficient permissions"),
            );
        }

        if (process.env.NODE_ENV !== "production") {
            console.log("RBAC check:", { role, allowedRoles });
        }

        next();
    };
};

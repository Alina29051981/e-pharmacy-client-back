// src/middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;

    res.status(status).json({
        status: "error",
        code: status,
        message: err.message || "Server error",
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};

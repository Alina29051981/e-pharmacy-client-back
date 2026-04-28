// src/services/jwt.js;
import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) =>
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);

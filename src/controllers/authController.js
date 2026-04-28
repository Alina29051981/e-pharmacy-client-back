// src/controllers/authController.js

import bcrypt from "bcryptjs";
import createError from "http-errors";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { sendResetEmail } from "../services/emailService.js";
import { generateTokens } from "../services/jwt.js";

//
// ===================== REGISTER =====================
//
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return next(createError(409, "Email already in use"));

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        const tokens = generateTokens(user._id);

        return res.status(201).json({
            user: user.toJSON(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (err) {
        next(err);
    }
};

//
// ===================== LOGIN =====================
//
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return next(createError(401, "Invalid credentials"));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(createError(401, "Invalid credentials"));

        const tokens = generateTokens(user._id);

        return res.json({
            user: user.toJSON(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (err) {
        next(err);
    }
};

//
// ===================== LOGOUT =====================
//
export const logoutUser = (req, res) => {
    res.json({ message: "Logged out successfully" });
};

//
// ===================== USER INFO =====================
//
export const getUserInfo = (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
    });
};

//
// ===================== REFRESH =====================
//
export const refreshToken = (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(createError(401, "No refresh token"));
        }

        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
        );

        const accessToken = jwt.sign(
            { userId: payload.userId },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" },
        );

        return res.json({ accessToken });
    } catch (err) {
        next(createError(401, err.message || "Invalid refresh token"));
    }
};

//
// ===================== RESET PASSWORD =====================
//
export const requestResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "If email exists, reset link sent" });
        }

        const token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

        await user.save();

        await sendResetEmail(email, token);

        res.json({ message: "Reset email sent" });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return next(createError(400, "Invalid or expired token"));
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        next(err);
    }
};

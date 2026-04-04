// src/controllers/authController.js

import bcrypt from "bcryptjs";
import createError from "http-errors";
import User from "../models/user.js";
import { Session } from "../models/session.js";
import { createSession, setSessionCookies } from "../services/auth.js";

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return next(createError(409, "Email already in use"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        const session = await createSession(user._id);
        setSessionCookies(res, session);

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(401, "Invalid credentials"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError(401, "Invalid credentials"));
        }

        const session = await createSession(user._id);
        setSessionCookies(res, session);

        res.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        next(err);
    }
};

// LOGOUT
export const logout = async (req, res) => {
    const { sessionId } = req.cookies;

    if (sessionId) {
        await Session.deleteOne({ _id: sessionId });
    }

    res.clearCookie("sessionId");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(204).send();
};

// USER INFO
export const getUserInfo = async (req, res) => {
    res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    });
};

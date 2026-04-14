// src/routes/authRoutes.js

import { Router } from "express";
import { celebrate } from "celebrate";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserSession,
    requestResetEmail,
    resetPassword,
    getUserInfo,
} from "../controllers/authController.js";

import {
    registerUserSchema,
    loginUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from "../validations/authValidation.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", celebrate(registerUserSchema), registerUser);

router.post("/login", celebrate(loginUserSchema), loginUser);

router.post("/refresh", authMiddleware, refreshUserSession);

router.post("/logout", authMiddleware, logoutUser);

router.get("/user-info", authMiddleware, getUserInfo);

router.post(
    "/request-reset-email",
    celebrate(requestResetEmailSchema),
    requestResetEmail,
);

router.post("/reset-password", celebrate(resetPasswordSchema), resetPassword);

export default router;

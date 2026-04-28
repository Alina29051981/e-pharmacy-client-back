// src/routes/authRoutes.js
import { Router } from "express";
import { celebrate } from "celebrate";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
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

//
// ===================== AUTH =====================
//
router.post("/register", celebrate(registerUserSchema), registerUser);

router.post("/login", celebrate(loginUserSchema), loginUser);

//
// ===================== PRIVATE ROUTES =====================
// (ONLY COOKIE AUTH VIA middleware)
//
router.get("/user-info", authMiddleware, getUserInfo);

router.post("/logout", authMiddleware, logoutUser);

router.post("/refresh", refreshToken);

//
// ===================== PASSWORD RESET =====================
//
router.post(
    "/request-reset-email",
    celebrate(requestResetEmailSchema),
    requestResetEmail,
);

router.post("/reset-password", celebrate(resetPasswordSchema), resetPassword);

export default router;

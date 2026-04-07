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

/**
 * ======================
 * PUBLIC ROUTES
 * ======================
 */

// register
router.post("/register", celebrate(registerUserSchema), registerUser);

// login
router.post("/login", celebrate(loginUserSchema), loginUser);

// refresh session
router.post("/refresh", refreshUserSession);

/**
 * ======================
 * PRIVATE ROUTES
 * ======================
 */

// logout user
router.post("/logout", authMiddleware, logoutUser);

// get current user info
router.get("/user-info", authMiddleware, getUserInfo);

/**
 * ======================
 * OPTIONAL AUTH FLOWS
 * ======================
 */

// request password reset email
router.post(
    "/request-reset-email",
    celebrate(requestResetEmailSchema),
    requestResetEmail,
);

// reset password
router.post("/reset-password", celebrate(resetPasswordSchema), resetPassword);

export default router;

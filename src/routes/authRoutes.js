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

// PUBLIC
router.post("/register", celebrate(registerUserSchema), registerUser);
router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/refresh", refreshUserSession);

// PRIVATE
router.post("/logout", authMiddleware, logoutUser);
router.get("/user-info", authMiddleware, getUserInfo);

// OPTIONAL (але круто)
router.post(
    "/request-reset-email",
    celebrate(requestResetEmailSchema),
    requestResetEmail,
);

router.post("/reset-password", celebrate(resetPasswordSchema), resetPassword);

export default router;

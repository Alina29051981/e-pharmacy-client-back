// src/routes/statisticsRoutes.js

import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";

import {
    getStatistics,
    getUserPurchases,
} from "../controllers/statisticsController.js";

const router = Router();

/**
 * 📊 GET /api/statistics
 * Загальна статистика магазину
 * (shopId передається через query: ?shopId=...)
 */
router.get("/", authMiddleware, checkShopOwner, getStatistics);

/**
 * 👤 GET /api/statistics/:userId/goods
 * Покупки конкретного користувача
 */
router.get("/:userId/goods", authMiddleware, getUserPurchases);

export default router;

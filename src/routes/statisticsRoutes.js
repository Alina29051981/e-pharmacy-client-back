// src/routes/statisticsRoutes.js

import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";

import {
    getStatistics,
    getUserPurchases,
} from "../controllers/statisticsController.js";

const router = Router();

router.get("/", authMiddleware, checkShopOwner, getStatistics);

router.get("/:userId/goods", authMiddleware, getUserPurchases);

export default router;

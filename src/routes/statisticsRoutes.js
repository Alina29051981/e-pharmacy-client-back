// src/routes/statisticsRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";
import { celebrate } from "celebrate";

import {
    getStatistics,
    getUserPurchases,
} from "../controllers/statisticsController.js";

import { userPurchasesSchema } from "../validations/statisticsValidation.js";

const router = Router();

router.get("/:shopId", authMiddleware, checkShopOwner, getStatistics);

router.get(
    "/:userId/goods",
    authMiddleware,
    celebrate(userPurchasesSchema),
    getUserPurchases,
);

export default router;

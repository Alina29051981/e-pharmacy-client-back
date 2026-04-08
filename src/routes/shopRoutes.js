// src/routes/shopRoutes.js

import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";
import { getProducts } from "../controllers/productController.js";
import {
    createShop,
    getShopById,
    updateShop,
} from "../controllers/shopController.js";

const router = Router();

/**
 * 📌 POST /api/shop/create
 */
router.post("/create", authMiddleware, createShop);

/**
 * 📌 GET /api/shop/:shopId
 */
router.get("/:shopId", authMiddleware, getShopById);

/**
 * 📌 PUT /api/shop/:shopId/update
 */
router.put("/:shopId/update", authMiddleware, checkShopOwner, updateShop);

router.get("/:shopId/product", authMiddleware, checkShopOwner, getProducts);

export default router;

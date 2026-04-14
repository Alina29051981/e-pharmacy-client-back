// src/routes/productRoutes.js

import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";
import { checkProductAccess } from "../middleware/checkProductAccess.js";
import { getProducts } from "../controllers/productController.js";
import {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.post("/:shopId/product", authMiddleware, checkShopOwner, addProduct);

router.put(
    "/:shopId/product/:productId",
    authMiddleware,
    checkShopOwner,
    checkProductAccess,
    updateProduct,
);

router.delete(
    "/:shopId/product/:productId",
    authMiddleware,
    checkShopOwner,
    checkProductAccess,
    deleteProduct,
);

router.get(
    "/:shopId/product/:productId",
    authMiddleware,
    checkProductAccess,
    getProductById,
);

router.get("/:shopId/product", authMiddleware, checkShopOwner, getProducts);

export default router;

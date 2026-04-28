// src/routes/productRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";
import { checkProductAccess } from "../middleware/checkProductAccess.js";
import {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

import { celebrate } from "celebrate";
import {
    productIdSchema,
    createProductSchema,
    updateProductSchema,
    getProductsSchema,
} from "../validations/productValidation.js";

const router = Router();

// GET LIST + FILTER + PAGINATION
router.get(
    "/:shopId/product",
    authMiddleware,
    checkShopOwner,
    celebrate(getProductsSchema),
    getProducts,
);

// CREATE PRODUCT
router.post(
    "/:shopId/product/add",
    authMiddleware,
    checkShopOwner,
    celebrate(createProductSchema),
    addProduct,
);

// GET SINGLE PRODUCT
router.get(
    "/:shopId/product/:productId",
    authMiddleware,
    checkProductAccess,
    celebrate(productIdSchema),
    getProductById,
);

// UPDATE PRODUCT
router.put(
    "/:shopId/product/:productId/edit",
    authMiddleware,
    checkProductAccess,
    celebrate(updateProductSchema),
    updateProduct,
);

// DELETE PRODUCT
router.delete(
    "/:shopId/product/:productId/delete",
    authMiddleware,
    checkProductAccess,
    celebrate(productIdSchema),
    deleteProduct,
);

export default router;

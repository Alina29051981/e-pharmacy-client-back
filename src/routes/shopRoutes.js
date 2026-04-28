// src/routes/shopRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkShopOwner } from "../middleware/checkShopOwner.js";
import { upload } from "../middleware/upload.js";
import {
    createShop,
    getShopById,
    updateShop,
    deleteShop,
} from "../controllers/shopController.js";
import { celebrate, Segments, Joi } from "celebrate";
import {
    updateShopSchema,
    createShopSchema,
} from "../validations/shopValidation.js";

const router = Router();

router.post(
    "/create",
    authMiddleware,
    upload.single("logo"),
    celebrate(createShopSchema),
    createShop,
);

router.get(
    "/:shopId",
    authMiddleware,
    celebrate({
        [Segments.PARAMS]: Joi.object({
            shopId: Joi.string().hex().length(24).required(),
        }),
    }),
    getShopById,
);

router.put(
    "/:shopId/update",
    authMiddleware,
    celebrate({
        [Segments.PARAMS]: Joi.object({
            shopId: Joi.string().hex().length(24).required(),
        }),
    }),
    checkShopOwner,
    celebrate(updateShopSchema),
    updateShop,
);

router.delete(
    "/:shopId/delete",
    authMiddleware,
    celebrate({
        [Segments.PARAMS]: Joi.object({
            shopId: Joi.string().hex().length(24).required(),
        }),
    }),
    checkShopOwner,
    deleteShop,
);

export default router;

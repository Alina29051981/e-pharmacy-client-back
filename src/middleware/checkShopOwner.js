// src/middleware/checkShopOwner.js

import createError from "http-errors";
import mongoose from "mongoose";
import Shop from "../models/shop.js";

export const checkShopOwner = async (req, res, next) => {
    try {
        const shopId = req.params.shopId || req.query.shopId;

        // ❗ перевірка валідності ID
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const shop = await Shop.findById(shopId);

        if (!shop) {
            return next(createError(404, "Shop not found"));
        }

        // 🔐 перевірка власника магазину
        if (shop.owner.toString() !== req.user._id.toString()) {
            return next(createError(403, "Forbidden: not your shop"));
        }

        // щоб не робити повторний запит в контролерах
        req.shop = shop;

        next();
    } catch (error) {
        console.error(error);
        next(createError(500, "Shop ownership check error"));
    }
};

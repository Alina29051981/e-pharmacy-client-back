// src/middleware/checkProductAccess.js

import createError from "http-errors";
import mongoose from "mongoose";
import Product from "../models/product.js";

export const checkProductAccess = async (req, res, next) => {
    try {
        const { productId, shopId } = req.params;

        // ❗ перевірка валідності ID
        if (
            !mongoose.Types.ObjectId.isValid(productId) ||
            !mongoose.Types.ObjectId.isValid(shopId)
        ) {
            return next(createError(400, "Invalid productId or shopId"));
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(createError(404, "Product not found"));
        }

        // ❗ перевірка що продукт належить цьому магазину
        if (product.shopId.toString() !== shopId.toString()) {
            return next(
                createError(403, "Product does not belong to this shop"),
            );
        }

        // ❗ додатково: перевірка авторизації
        if (!req.user || !req.user._id) {
            return next(createError(401, "Unauthorized"));
        }

        req.product = product;

        next();
    } catch (error) {
        console.error(error);
        next(createError(500, "Product access error"));
    }
};

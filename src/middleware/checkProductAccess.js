// src/middleware/checkProductAccess.js

import Product from "../models/product.js";
import createError from "http-errors";

export const checkProductAccess = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return next(createError(404, "Product not found"));
        }

        if (product.shopId.toString() !== req.params.shopId) {
            return next(createError(403, "Forbidden"));
        }

        req.product = product;

        next();
    } catch {
        next(createError(500, "Product access error"));
    }
};

// src/controllers/productController.js
import Product from "../models/product.js";
import createError from "http-errors";
import mongoose from "mongoose";

/**
 * 📦 GET /api/shop/:shopId/product
 */
export const getProducts = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const query = {
            shopId,
        };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);

        res.json(products);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to get products"));
    }
};

/**
 * 📦 GET /api/shop/:shopId/product/:productId
 */
export const getProductById = async (req, res, next) => {
    try {
        // ✅ беремо з middleware
        if (!req.product) {
            return next(createError(404, "Product not found"));
        }

        res.json(req.product);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to get product"));
    }
};

/**
 * ➕ POST /api/shop/:shopId/product
 */
export const addProduct = async (req, res, next) => {
    try {
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const { name, price, description, category, stock, suppliers } =
            req.body;

        if (!name || !price || !category) {
            return next(
                createError(400, "Name, price and category are required"),
            );
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            suppliers,
            shopId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to create product"));
    }
};

/**
 * ✏️ PUT /api/shop/:shopId/product/:productId
 */
export const updateProduct = async (req, res, next) => {
    try {
        // ✅ вже перевірено middleware
        if (!req.product) {
            return next(createError(404, "Product not found"));
        }

        Object.assign(req.product, req.body);

        await req.product.save();

        res.json(req.product);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to update product"));
    }
};

/**
 * ❌ DELETE /api/shop/:shopId/product/:productId
 */
export const deleteProduct = async (req, res, next) => {
    try {
        if (!req.product) {
            return next(createError(404, "Product not found"));
        }

        await req.product.deleteOne();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to delete product"));
    }
};

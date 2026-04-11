// src/controllers/statisticsController.js
import mongoose from "mongoose";
import Product from "../models/product.js";
import Purchase from "../models/purchase.js";
import createError from "http-errors";

/**
 * GET /api/statistics?shopId=
 */
export const getStatistics = async (req, res, next) => {
    try {
        const shopId = req.query.shopId || req.params.shopId;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const shopObjectId = new mongoose.Types.ObjectId(shopId);

        // 📦 1. Кількість продуктів
        const productsCount = await Product.countDocuments({ shopId });

        // 💰 2. Агрегована статистика покупок (ефективніше ніж find + reduce)
        const stats = await Purchase.aggregate([
            { $match: { shopId: shopObjectId } },

            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                    purchasesCount: { $sum: 1 },
                },
            },
        ]);

        const totalRevenue = stats[0]?.totalRevenue || 0;
        const purchasesCount = stats[0]?.purchasesCount || 0;

        // 👥 3. Останні клієнти
        const lastClients = await Purchase.aggregate([
            { $match: { shopId: shopObjectId } },

            { $sort: { createdAt: -1 } },

            {
                $group: {
                    _id: "$userId",
                    lastPurchaseDate: { $first: "$createdAt" },
                    totalSpent: { $sum: "$totalPrice" },
                },
            },

            { $sort: { lastPurchaseDate: -1 } },
            { $limit: 10 },
        ]);

        res.json({
            shopId,
            productsCount,
            purchasesCount,
            totalRevenue,
            lastClients,
        });
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to get statistics"));
    }
};

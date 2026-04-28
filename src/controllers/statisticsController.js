// src/controllers/statisticsController.js
import Product from "../models/product.js";
import Purchase from "../models/purchase.js";
import createError from "http-errors";

export const getStatistics = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;

        const productsCount = await Product.countDocuments({ shopId });

        const stats = await Purchase.aggregate([
            { $match: { shopId } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                    purchasesCount: { $sum: 1 },
                },
            },
        ]);

        res.json({
            productsCount,
            totalRevenue: stats[0]?.totalRevenue || 0,
            purchasesCount: stats[0]?.purchasesCount || 0,
        });
    } catch (err) {
        next(err);
    }
};

export const getUserPurchases = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId) {
            return next(createError(403, "Forbidden"));
        }

        const purchases = await Purchase.find({
            userId: req.params.userId,
        }).populate("productId", "name price");

        res.json(purchases);
    } catch (err) {
        next(err);
    }
};

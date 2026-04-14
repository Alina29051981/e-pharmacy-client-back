// src/controllers/shopController.js

import Shop from "../models/shop.js";
import createError from "http-errors";
import mongoose from "mongoose";

export const createShop = async (req, res, next) => {
    try {
        const { name, email, phone, address, logo } = req.body;

        if (!name || !email) {
            return next(createError(400, "Name and email are required"));
        }

        const shop = await Shop.create({
            name,
            email,
            phone,
            address,
            logo,
            owner: req.user._id,
        });

        res.status(201).json(shop);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to create shop"));
    }
};

export const getShopById = async (req, res, next) => {
    try {
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const shop = await Shop.findById(shopId).populate(
            "owner",
            "name email",
        );

        if (!shop) {
            return next(createError(404, "Shop not found"));
        }

        res.json(shop);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to get shop"));
    }
};

export const updateShop = async (req, res, next) => {
    try {
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return next(createError(400, "Invalid shopId"));
        }

        const updates = req.body;

        const shop = await Shop.findByIdAndUpdate(shopId, updates, {
            new: true,
        });

        if (!shop) {
            return next(createError(404, "Shop not found"));
        }

        res.json(shop);
    } catch (error) {
        console.error(error);
        next(createError(500, "Failed to update shop"));
    }
};

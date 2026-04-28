// src/controllers/shopController.js

import Shop from "../models/shop.js";
import createError from "http-errors";

export const createShop = async (req, res, next) => {
    try {
        const exists = await Shop.findOne({ owner: req.user.id });
        if (exists) {
            return next(createError(409, "Shop already exists"));
        }

        const logo = req.file ? req.file.path : null;

        const shop = await Shop.create({
            ...req.body,
            logo,
            owner: req.user.id,
        });

        res.status(201).json(shop);
    } catch (err) {
        next(err);
    }
};

export const getShopById = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.shopId).populate(
            "owner",
            "name email",
        );

        if (!shop) return next(createError(404, "Shop not found"));

        res.json(shop);
    } catch (err) {
        next(err);
    }
};

export const updateShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.shopId);

        if (!shop) return next(createError(404, "Shop not found"));

        if (shop.owner.toString() !== req.user.id)
            return next(createError(403, "Forbidden"));

        Object.assign(shop, req.body);

        await shop.save();

        res.json(shop);
    } catch (err) {
        next(err);
    }
};

export const deleteShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.shopId);

        if (!shop) return next(createError(404, "Shop not found"));

        if (shop.owner.toString() !== req.user.id)
            return next(createError(403, "Forbidden"));

        await shop.deleteOne();

        res.json({ message: "Shop deleted" });
    } catch (err) {
        next(err);
    }
};

// src/controllers/productController.js
import Product from "../models/product.js";

export const getProducts = async (req, res, next) => {
    try {
        const { shopId } = req.params;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search = "", category = "" } = req.query;

        const filter = {
            shopId,
            ...(category && { category }),
            ...(search && {
                name: { $regex: search, $options: "i" },
            }),
        };

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(filter);

        res.json({
            data: products,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (err) {
        next(err);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const product = await Product.create({
            ...req.body,
            shopId: req.params.shopId,
        });

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res) => {
    res.json(req.product);
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = req.product;

        const allowedFields = [
            "name",
            "price",
            "description",
            "category",
            "stock",
            "suppliers",
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        await product.save();

        res.json(product);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res) => {
    await req.product.deleteOne();
    res.json({ message: "Product deleted" });
};

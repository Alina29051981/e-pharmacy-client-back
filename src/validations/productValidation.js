// src/validations/productValidation.js

import { Joi, Segments } from "celebrate";

// 📌 ObjectId перевірка
const objectId = Joi.string().hex().length(24);

// 📌 GET /:shopId/product/:productId
export const productIdSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        shopId: objectId.required(),
        productId: objectId.required(),
    }),
};

// 📌 POST /add
export const createProductSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        shopId: objectId.required(),
    }),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(100).required(),

        price: Joi.number().positive().required(),

        description: Joi.string().allow("").max(500),

        category: Joi.string().min(2).max(50).required(),

        stock: Joi.number().integer().min(0).default(0),

        suppliers: Joi.array().items(Joi.string()).default([]),
    }),
};

// 📌 PUT /edit
export const updateProductSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        shopId: objectId.required(),
        productId: objectId.required(),
    }),

    [Segments.BODY]: Joi.object()
        .keys({
            name: Joi.string().min(2).max(100),

            price: Joi.number().positive(),

            description: Joi.string().allow("").max(500),

            category: Joi.string().min(2).max(50),

            stock: Joi.number().integer().min(0),

            suppliers: Joi.array().items(Joi.string()),
        })
        .min(1), // 🔥 хоча б одне поле для апдейту
};

export const getProductsSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        shopId: objectId.required(),
    }),

    [Segments.QUERY]: Joi.object().keys({
        search: Joi.string().allow(""),
        category: Joi.string().allow(""),
    }),
};

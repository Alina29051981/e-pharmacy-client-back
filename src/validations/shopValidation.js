// src/validations/shopValidation.js

import { Joi, Segments } from "celebrate";

const objectId = Joi.string().hex().length(24);

export const createShopSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
            .pattern(/^\+?[0-9]{10,15}$/)
            .required(),
        address: Joi.string().max(255).required(),
    }),
};

export const updateShopSchema = {
    [Segments.PARAMS]: Joi.object({
        shopId: objectId.required(),
    }),

    [Segments.BODY]: Joi.object({
        name: Joi.string().trim().min(2).max(100),
        email: Joi.string().trim().email(),
        phone: Joi.string()
            .trim()
            .pattern(/^\+?[1-9]\d{9,14}$/),
        address: Joi.string().trim().max(255),
    }).min(1),
};

// src/validations/authValidation.js
import { Joi, Segments } from "celebrate";

export const registerUserSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(2).max(50).required(),

        email: Joi.string().email().required(),

        phone: Joi.string()
            .pattern(/^\+?[0-9]{10,15}$/)
            .optional(),

        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
            .required(),
    }),
};

export const loginUserSchema = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

export const requestResetEmailSchema = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
    }),
};

export const resetPasswordSchema = {
    [Segments.BODY]: Joi.object({
        password: Joi.string().min(8).required(),
        token: Joi.string().required(),
    }),
};

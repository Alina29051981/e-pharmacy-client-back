// src/validations/statisticsValidation.js

import { Joi, Segments } from "celebrate";

const objectId = Joi.string().hex().length(24);

export const userPurchasesSchema = {
    [Segments.PARAMS]: Joi.object({
        userId: objectId.required(),
    }),
};

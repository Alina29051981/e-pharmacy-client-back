// src/models/purchase.js

import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
        },

        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Purchase", purchaseSchema);

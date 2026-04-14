// src/models/shop.js

import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
        },

        phone: {
            type: String,
        },

        address: {
            type: String,
        },

        logo: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Shop", shopSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        suppliers: {
            type: [String],
            default: [],
        },

        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Product", productSchema);

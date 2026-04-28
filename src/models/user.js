// src/models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
            match: /^\+?[0-9]{10,15}$/, // 🔧 ТЗ: перевірка формату телефону
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            match: /^(?=.*[A-Za-z])(?=.*\d).+$/, // 🔧 ТЗ: базова складність пароля
        },

        role: {
            type: String,
            enum: ["user", "owner", "admin"],
            default: "user",
        },

        resetPasswordToken: {
            type: String,
            default: null,
        },

        resetPasswordExpires: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
};

export default mongoose.model("User", userSchema);

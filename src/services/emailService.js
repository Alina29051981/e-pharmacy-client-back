// src/services/emailService.js;

import nodemailer from "nodemailer";

export const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Click to reset password:</p><a href="${resetLink}">${resetLink}</a>`,
    });
};

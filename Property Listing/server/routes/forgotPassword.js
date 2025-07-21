import express from 'express';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate reset token (valid for 15 minutes)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Password Reset - FindMyHome",
      html: `
        <p>Hello ${user.name || 'User'},</p>
        <p>You requested to reset your password. Click the link below to continue:</p>
        <a href="${resetLink}" target="_blank">Reset Your Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset link sent to email.' });

  } catch (err) {
    console.error("Error sending reset link:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

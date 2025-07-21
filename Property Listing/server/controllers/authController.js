import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

// Utility: Create JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '7d' }
  );
};

// 1️⃣ Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = createToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

// 2️⃣ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 3️⃣ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

   const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
const resetLink = `${frontendURL}/reset-password/${token}`;


   await transporter.sendMail({
  from: `"FindMyHome Support" <${process.env.SMTP_EMAIL}>`,
  to: email,
  subject: 'Reset Your Password - FindMyHome',
  html: `
    <h2>Hi ${user.name || ''},</h2>
    <p>We received a request to reset your password.</p>
    <p>Click the button below to reset it:</p>
    <a href="${resetLink}" style="
      display: inline-block;
      padding: 10px 20px;
      background-color: #7c3aed;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    ">Reset Password</a>
    <p>This link will expire in 15 minutes.</p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
    <br/>
    <strong>— FindMyHome Team</strong>
  `,
});


    res.json({ message: 'Reset link sent to email.' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ error: 'Could not send reset link' });
  }
};

// 4️⃣ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'Invalid token' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ error: 'Reset failed or token expired' });
  }
};

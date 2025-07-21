import express from 'express';
import Inquiry from '../models/Inquiry.js';
import nodemailer from 'nodemailer';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: req.body.email,
      subject: 'Thank You for Your Inquiry - FindMyHome',
      text: `Hi ${req.body.name},\n\nThank you for contacting us. We’ve received your inquiry and will get back to you shortly.\n\nMessage:\n${req.body.message}\n\n- Team FindMyHome`
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Inquiry received and email sent!' });
  } catch (err) {
    console.error('Error saving inquiry or sending email:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

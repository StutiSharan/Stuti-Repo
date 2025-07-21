import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactRoutes from './routes/contact.js';


dotenv.config();

const app = express();

// DB Connection
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/upload', uploadRoutes);

// Start Server
app.listen(process.env.PORT || 5000, () => console.log('🚀 Backend running...'));

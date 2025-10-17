import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Routes imports (à créer ensuite)
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import freelanceRoutes from './routes/freelances.js';
import missionRoutes from './routes/missions.js';

// Configuration
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});
app.use(limiter);

// Routes de base
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/freelances', freelanceRoutes);
app.use('/api/missions', missionRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Caribe LinkUp API is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

// Connexion MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Caribe LinkUp Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

export default app;
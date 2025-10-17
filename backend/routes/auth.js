import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Middleware de logging pour debug
router.use((req, res, next) => {
  console.log(`🔍 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('📦 Body:', req.body);
  next();
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
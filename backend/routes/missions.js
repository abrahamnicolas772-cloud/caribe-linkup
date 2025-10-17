import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Routes à implémenter
router.get('/', (req, res) => {
  res.json({ message: 'Liste des missions - À implémenter' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Création mission - À implémenter' });
});

export default router;
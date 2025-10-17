import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes à implémenter
router.get('/', (req, res) => {
  res.json({ message: 'Liste des freelances - À implémenter' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Profil freelance - À implémenter' });
});

export default router;
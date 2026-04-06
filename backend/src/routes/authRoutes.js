import express from 'express';
const router = express.Router();
import { register, login, getAccount, logout } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Pakai 'protect' supaya kita tahu siapa yang sedang minta data profilnya
router.get('/profile', protect, getAccount);
router.get('/me', protect, getAccount);

export default router;
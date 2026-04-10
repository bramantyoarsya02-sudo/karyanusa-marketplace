import express from 'express';
import { getSellerStats } from '../controller/statsController.js';
import { protect, sellerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/seller', protect, sellerOnly, getSellerStats);

export default router;

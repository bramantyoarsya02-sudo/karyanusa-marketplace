import express from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getOrders);
router.post('/', protect, createOrder);
router.patch('/:id/status', protect, updateOrderStatus);

export default router;

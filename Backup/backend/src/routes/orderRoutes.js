import { Router } from 'express';
import { createOrder, myOrders, allOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createOrder);
router.get('/my', protect, myOrders);
router.get('/', protect, admin, allOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;

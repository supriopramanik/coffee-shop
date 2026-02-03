import { Router } from 'express';
import { listUsers, userOrders, updateProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, admin, listUsers);
router.get('/:id/orders', protect, admin, userOrders);
router.put('/profile', protect, updateProfile);

export default router;

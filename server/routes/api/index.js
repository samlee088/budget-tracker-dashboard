import express from 'express';
import userRoutes from './userRoutes.js';
import expenseRoutes from './expenseRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/expenses', expenseRoutes);

export default router;

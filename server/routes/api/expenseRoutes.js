import express from 'express';
import { addExpense } from '../../controllers/expense-controller.js'
import { authMiddleware } from '../../utils/auth.js';

const router = express.Router();

router.route('/add').post( authMiddleware, addExpense)

export default router;

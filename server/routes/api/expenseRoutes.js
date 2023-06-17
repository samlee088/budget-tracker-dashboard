import express from 'express';
import { addExpense, getAllExpenses } from '../../controllers/expense-controller.js'
import { authMiddleware } from '../../utils/auth.js';

const router = express.Router();

router.route('/add').post( authMiddleware, addExpense )
router.route('/all').get(authMiddleware, getAllExpenses);



export default router;

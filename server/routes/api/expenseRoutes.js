import express from 'express';
import { addExpense, getAllExpenses, addPayment } from '../../controllers/expense-controller.js'
import { authMiddleware } from '../../utils/auth.js';

const router = express.Router();

router.route('/add').post( authMiddleware, addExpense );
router.route('/all').get(authMiddleware, getAllExpenses);
router.route('/addPayment').post( authMiddleware, addPayment );


export default router;

import express from 'express';
import { createUser, login, } from '../../controllers/user.js';
import { authMiddleware } from '../../utils/auth.js';

const router = express.Router();

router.route('/').post(createUser).put(authMiddleware);

router.route('/login').post(login);

export default router;

import express from 'express';
import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/api', apiRoutes);

// Catch-all route for non-API routes
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;

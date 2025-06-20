import express from 'express';
import { createVote, getResults } from '../controllers/voteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createVote);

router.get('/results', getResults);

export default router;

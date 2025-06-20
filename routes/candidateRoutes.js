import express from 'express';
import {
  addCandidate,
  getCandidates,
} from '../controllers/candidateController.js';

const router = express.Router();

router.route('/').post(addCandidate).get(getCandidates);

export default router;

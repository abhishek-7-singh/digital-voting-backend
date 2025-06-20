import express from 'express';
import { loginUser, registerVoter } from '../controllers/voterController.js';

const router = express.Router();

router.route('/').post(registerVoter);

router.post('/login', loginUser);

export default router;

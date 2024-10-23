// routes/index.js
import express from 'express';
import { startSessionController, endSessionController } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/session/:sessionId/start/:musicName', startSessionController);
router.post('/session/:sessionId/end', endSessionController);

export default router;

import express from 'express';
import { startSessionWithMusic, endSessionAndMusic, listSessionFiles, downloadSessionFile } from './dataHandler.js';

const router = express.Router();

router.get('/start-session/:sessionId/:musicName', startSessionWithMusic);
router.get('/end-session/:sessionId', endSessionAndMusic);
router.get('/list-session-files/:sessionId', listSessionFiles);
router.get('/download-session-file/:filename', downloadSessionFile);

export default router;

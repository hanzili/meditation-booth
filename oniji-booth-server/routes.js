const express = require('express');
const { 
  startSessionWithMusic, 
  stopSessionAndMusic, 
  listSessionFiles, 
  downloadSessionFile 
} = require('./dataHandler');

const router = express.Router();

router.get('/start-session/:sessionId/:musicName', startSessionWithMusic);
router.get('/stop-session/:sessionId', stopSessionAndMusic);
router.get('/list-session-files/:sessionId', listSessionFiles);
router.get('/download-session-file/:filename', downloadSessionFile);

module.exports = router;

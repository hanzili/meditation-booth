import { startSession, endSession } from '../services/sessionService.js';
import logger from '../config/logger.js';

async function startSessionController(req, res) {
  const { sessionId, musicName } = req.params;

  try {
    const result = await startSession(sessionId, musicName);
    res.json({
      ...result
    });
  } catch (error) {
    logger.error('Error in startSessionController', { sessionId, error: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
}

async function endSessionController(req, res) {
  const { sessionId } = req.params;

  try {
    const result = await endSession(sessionId);
    res.json(result);
  } catch (error) {
    logger.error('Error in endSessionController', { sessionId, error: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
}

export { startSessionController, endSessionController };
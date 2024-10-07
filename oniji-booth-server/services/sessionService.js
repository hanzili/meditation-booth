import {
    initNeurosity,
    disconnectNeurosity,
  } from './neurosityService.js';
  import {
    initializePlayer,
    playMusic,
    stopMusic,
    getAudioDuration,
  } from './audioService.js';
  import { sendSessionEndMutation } from './graphqlService.js';
  import { togglePlug } from './plugService.js';
  import logger from '../config/logger.js';
  
  let isSessionActive = false;
  let currentSessionId = null;
  let dataBuffer = [];
  let sessionTimeout = null;
  
  async function startSession(sessionId, musicName) {
    logger.info(`Attempting to start session`, { sessionId, musicName });
  
    if (isSessionActive) {
      logger.warn('Attempt to start session while another is active', { sessionId });
      throw new Error('A session is already active');
    }
  
    try {
      logger.info('Initializing player');
      await initializePlayer();
      
      logger.info('Initializing Neurosity');
      const neurosity = await initNeurosity();
      
      logger.info('Getting audio duration', { musicName });
      const musicDuration = await getAudioDuration(musicName);
  
      isSessionActive = true;
      currentSessionId = sessionId;
      dataBuffer = [];
  
      logger.info('Setting up Neurosity calm subscription');
      neurosity.calm().subscribe((calm) => {
        if (isSessionActive && currentSessionId === sessionId) {
          dataBuffer.push(calm.probability);
          logger.debug('Received calm data', { probability: calm.probability });
        }
      });
  
      logger.info('Turning off neurosity plug');
      await togglePlug('off', 'neurosity');

      logger.info('Turning on scent plug');
      await togglePlug('on', 'scent');

      logger.info('Starting music playback', { musicName });
      playMusic(musicName);
  
      sessionTimeout = setTimeout(() => {
        if (isSessionActive && currentSessionId === sessionId) {
          logger.info('Music duration reached, ending session', { sessionId });
          endSession(sessionId);
        }
      }, musicDuration * 1000);
  
      logger.info('Session started successfully', { sessionId, musicName, duration: musicDuration });
      return { sessionId, musicName, duration: musicDuration };
    } catch (error) {
      logger.error('Error starting session', { sessionId, error: error.message, stack: error.stack });
      isSessionActive = false;
      currentSessionId = null;
      throw error;
    }
  }
  
  async function endSession(sessionId) {
    logger.info(`Attempting to end session`, { sessionId });
  
    if (!isSessionActive || currentSessionId !== sessionId) {
      logger.warn('Attempt to end invalid or inactive session', { sessionId, currentSessionId, isSessionActive });
      throw new Error('No active session or invalid session ID');
    }
  
    try {
      isSessionActive = false;
      currentSessionId = null;
  
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        sessionTimeout = null;
      }
  
      logger.info('Stopping music');
      stopMusic();
      
      logger.info('Disconnecting Neurosity');
      await disconnectNeurosity();
      
      logger.info('Turning on neurosity plug');
      await togglePlug('on', 'neurosity');

      logger.info('Turning off scent plug');
      await togglePlug('off', 'scent');
  
      logger.info('Sending session end mutation', { sessionId, dataBufferLength: dataBuffer.length });
      await sendSessionEndMutation(sessionId, dataBuffer);
      dataBuffer = [];
  
      logger.info('Session ended successfully', { sessionId });
      return { message: 'Session ended successfully' };
    } catch (error) {
      logger.error('Error ending session', { sessionId, error: error.message, stack: error.stack });
      throw error;
    }
  }
  
  export { startSession, endSession };
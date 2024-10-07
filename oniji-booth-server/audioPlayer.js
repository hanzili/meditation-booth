// audioPlayer.js
import path from 'path';
import { promises as fsPromises } from 'fs';
import * as mm from 'music-metadata';
import config from './config.js';

const isMac = process.platform === 'darwin';

let player;
let currentPlayer = null;

if (isMac) {
  const playSound = (await import('play-sound')).default;
  player = playSound({});
} else {
  const APlay = (await import('node-aplay')).default;
  player = {
    play: (filepath, callback) => {
      const aplay = new APlay(filepath);
      aplay.play();
      aplay.on('complete', () => callback && callback());
      return aplay;
    }
  };
}

async function getAudioDuration(filePath) {
  try {
    console.log(`Getting duration for: ${filePath}`);
    const metadata = await mm.parseFile(filePath);
    const durationInSeconds = Math.ceil(metadata.format.duration);
    console.log(`Audio duration: ${durationInSeconds} seconds`);
    return durationInSeconds;
  } catch (error) {
    console.error(`Error getting audio duration: ${error.message}`);
    throw error;
  }
}

const playMusic = async (musicFile) => {
  const filePath = path.join(config.musicDir, musicFile);
  
  try {
    await fsPromises.access(filePath);
    console.log(`Playing music: ${musicFile}`);
    
    const duration = await getAudioDuration(filePath);
    
    return new Promise((resolve, reject) => {
      currentPlayer = player.play(filePath, (err) => {
        if (err) {
          console.error(`Error playing ${musicFile}:`, err);
          reject(err);
        } else {
          console.log(`Finished playing: ${musicFile}`);
          resolve();
        }
      });
      
      console.log(`Music started, duration: ${duration} seconds`);
      resolve(duration);
    });
  } catch (error) {
    console.error(`Error accessing or playing music file ${musicFile}:`, error);
    throw error;
  }
};

const stopMusic = () => {
  if (currentPlayer) {
    if (isMac) {
      currentPlayer.kill();
    } else {
      currentPlayer.stop();
    }
    currentPlayer = null;
    console.log('Music stopped');
  }
};

export { playMusic, stopMusic };

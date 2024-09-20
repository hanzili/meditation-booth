import path from 'path';
import { promises as fsPromises } from 'fs';
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

const playMusic = async (musicFile) => {
  const filePath = path.join(config.musicDir, musicFile);
  
  try {
    await fsPromises.access(filePath);
    console.log(`Playing music: ${musicFile}`);
    currentPlayer = player.play(filePath, (err) => {
      if (err) console.error(`Error playing ${musicFile}:`, err);
      console.log(`Finished playing: ${musicFile}`);
    });
  } catch (error) {
    console.error(`Error accessing music file ${musicFile}:`, error);
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

// services/audioService.js
import path from 'path';
import { promises as fsPromises } from 'fs';
import * as mm from 'music-metadata';
import config from '../config/index.js';
import { platform } from 'os';

let player;
let currentPlayer = null;

const isMac = platform() === 'darwin';

async function initializePlayer() {
  if (isMac) {
    const { default: playSound } = await import('play-sound');
    player = playSound({});
  } else {
    const { default: APlay } = await import('node-aplay');
    player = {
      play: (filepath, callback) => {
        const aplay = new APlay(filepath);
        aplay.play();
        aplay.on('complete', () => callback && callback());
        return aplay;
      },
    };
  }
}

async function getAudioDuration(musicFile) {
  const filePath = path.join(config.musicDir, musicFile);
  try {
    const metadata = await mm.parseFile(filePath);
    return Math.ceil(metadata.format.duration);
  } catch (error) {
    throw new Error(`Error getting audio duration: ${error.message}`);
  }
}

async function playMusic(musicFile) {
  const filePath = path.join(config.musicDir, musicFile);
  await fsPromises.access(filePath);

  return new Promise((resolve, reject) => {
    currentPlayer = player.play(filePath, (err) => {
      if (err) {
        return reject(new Error(`Error playing ${musicFile}: ${err.message}`));
      }
      resolve();
    });
  });
}

function stopMusic() {
  if (currentPlayer) {
    if (isMac) {
      currentPlayer.kill();
    } else {
      currentPlayer.stop();
    }
    currentPlayer = null;
  }
}

export { initializePlayer, playMusic, stopMusic, getAudioDuration };

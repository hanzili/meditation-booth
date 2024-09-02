const path = require('path');
const fs = require('fs').promises;
const { musicDir } = require('./config');

const isMac = process.platform === 'darwin';

let player;
let currentPlayer = null;

if (isMac) {
  player = require('play-sound')(opts = {});
} else {
  const APlay = require('node-aplay');
  player = {
    play: (filepath, callback) => {
      const aplay = new APlay(filepath);
      aplay.play();
      aplay.on('complete', () => callback && callback());
      return aplay;
    }
  };
}

exports.playMusic = async (musicName) => {
  try {
    const musicPath = path.join(musicDir, musicName);
    
    // Check if the file exists
    await fs.access(musicPath);
    
    if (currentPlayer) {
      if (isMac) {
        currentPlayer.kill();
      } else {
        currentPlayer.stop();
      }
    }

    currentPlayer = player.play(musicPath, (err) => {
      if (err) console.error('Error playing audio:', err);
    });

    console.log(`Playing music: ${musicName}`);
  } catch (error) {
    console.error('Error playing music:', error);
    throw new Error(`Music file not found: ${musicName}`);
  }
};

exports.stopMusic = () => {
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

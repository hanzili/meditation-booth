require('dotenv').config();

const config = {
  deviceId: process.env.DEVICE_ID,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  dataDir: process.env.DATA_DIR || './data',
  musicDir: process.env.MUSIC_DIR || './music',
  port: process.env.PORT || 3001,
  bufferSize: 100
};

const verifyConfig = () => {
  const requiredFields = ['deviceId', 'email', 'password', 'dataDir'];
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required configuration: ${field}`);
    }
  }
};

verifyConfig();

module.exports = config;

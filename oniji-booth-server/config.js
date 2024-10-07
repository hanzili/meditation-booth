// config.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  deviceId: process.env.DEVICE_ID,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  dataDir: process.env.DATA_DIR || './data',
  musicDir: process.env.MUSIC_DIR || './music',
  port: process.env.PORT || 3001,
  bufferSize: 100,
  neurosityPlugHost: process.env.NEUROSITY_PLUG_HOST || '192.168.2.72',
  scentPlugHost: process.env.SCENT_PLUG_HOST,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8080'
};

const verifyConfig = () => {
  const requiredFields = ['deviceId', 'email', 'password', 'neurosityPlugHost', 'backendUrl'];
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required configuration: ${field}`);
    }
  }
};

verifyConfig();

export default config;

// config/index.js
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
  deviceId: process.env.DEVICE_ID,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  dataDir: process.env.DATA_DIR || path.resolve('data'),
  musicDir: process.env.MUSIC_DIR || path.resolve('music'),
  port: process.env.PORT || 3001,
  neurosityPlugHost: process.env.NEUROSITY_PLUG_HOST,
  scentPlugHost: process.env.SCENT_PLUG_HOST,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8080/query',
  usePlug: process.env.USE_PLUG === 'true',
};

const requiredFields = [
  'deviceId',
  'email',
  'password',
  'backendUrl',
];

if (config.usePlug === 'true') {
  requiredFields.push('neurosityPlugHost', 'scentPlugHost');
}

requiredFields.forEach((field) => {
  if (!config[field]) {
    throw new Error(`Missing required configuration: ${field}`);
  }
});

export default config;

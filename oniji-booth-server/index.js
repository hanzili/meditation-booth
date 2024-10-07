// index.js
import app from './app.js';
import config from './config/index.js';
import { disconnectNeurosity } from './services/neurosityService.js';
import { togglePlug } from './services/plugService.js';

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

async function shutdown() {
  console.log('Shutting down server...');
  await disconnectNeurosity();
  await togglePlug('on', 'neurosity');
  await togglePlug('off', 'scent');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

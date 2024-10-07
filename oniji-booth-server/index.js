// index.js
import express from 'express';
import config from './config.js';
import routes from './routes.js';
import { disconnectNeurosity } from './neurosity.js';
import { togglePlugOn } from './plug.js';

const app = express();

async function cleanUp() {
  await disconnectNeurosity();
  //await togglePlugOn();
}

async function main() {
  await cleanUp();

  try {
    app.use('/', routes);
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();

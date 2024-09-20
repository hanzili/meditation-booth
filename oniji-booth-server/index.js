import express from 'express';
import config from './config.js';
import routes from './routes.js';

const app = express();

async function main() {
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

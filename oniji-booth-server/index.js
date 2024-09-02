const express = require('express');
const { initNeurosity } = require('./neurosity');
const { port } = require('./config');
const routes = require('./routes');

const app = express();

async function main() {
  try {
    await initNeurosity();
    app.use('/', routes);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();

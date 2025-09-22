const app = require('./app');
const { getConfig } = require('./config/env');

const cfg = getConfig();
const PORT = cfg.server.port;
const HOST = cfg.server.host;

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;

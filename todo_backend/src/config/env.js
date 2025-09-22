'use strict';

/**
 * Environment configuration loader.
 * Reads environment variables to configure the application.
 * Do not read .env directly here; rely on process.env which is set externally.
 */

require('dotenv').config();

/**
/* PUBLIC_INTERFACE
 */
function getConfig() {
  /** Returns normalized configuration derived from environment variables. */
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const PORT = parseInt(process.env.PORT || '3001', 10);
  const HOST = process.env.HOST || '0.0.0.0';
  const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
  const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

  return {
    env: NODE_ENV,
    server: {
      port: PORT,
      host: HOST,
    },
    auth: {
      jwtSecret: JWT_SECRET,
      jwtExpiresIn: JWT_EXPIRES_IN,
    },
    cors: {
      origin: CORS_ORIGIN,
    },
  };
}

module.exports = {
  // PUBLIC_INTERFACE
  getConfig,
};

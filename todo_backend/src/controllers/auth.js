'use strict';

const authService = require('../services/auth');

class AuthController {
  /**
   * Register a new user.
   * Body: { email: string, password: string, name?: string }
   */
  // PUBLIC_INTERFACE
  async register(req, res, next) {
    /** Registers a user and returns JWT. */
    try {
      const { email, password, name } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
      }
      const result = await authService.register({ email, password, name });
      return res.status(201).json({ status: 'ok', ...result });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message || 'Registration failed' });
    }
  }

  /**
   * Login an existing user.
   * Body: { email: string, password: string }
   */
  // PUBLIC_INTERFACE
  async login(req, res, next) {
    /** Authenticates a user and returns JWT. */
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
      }
      const result = await authService.login({ email, password });
      return res.status(200).json({ status: 'ok', ...result });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message || 'Login failed' });
    }
  }
}

module.exports = new AuthController();

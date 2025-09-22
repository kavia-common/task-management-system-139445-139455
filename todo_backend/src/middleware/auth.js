'use strict';

const jwt = require('jsonwebtoken');
const { getConfig } = require('../config/env');
const { findUserById } = require('../models/datastore');

// PUBLIC_INTERFACE
function authenticate(req, res, next) {
  /** Express middleware to authenticate requests using Bearer JWT. */
  try {
    const header = req.get('Authorization') || '';
    const [, token] = header.split(' ');
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Missing token' });
    }
    const cfg = getConfig();
    const payload = jwt.verify(token, cfg.auth.jwtSecret);
    const user = findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
    req.user = { id: user.id, email: user.email, name: user.name };
    return next();
  } catch (e) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
}

module.exports = {
  // PUBLIC_INTERFACE
  authenticate,
};

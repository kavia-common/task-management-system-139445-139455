'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { getConfig } = require('../config/env');
const { findUserByEmail, createUser } = require('../models/datastore');

/**
 * Hash a password using SHA-256 for demo purposes.
 * Replace with bcrypt or argon2 in production.
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify password by comparing hash.
 */
function verifyPassword(password, passwordHash) {
  return hashPassword(password) === passwordHash;
}

/**
 * Generate a JWT for a user.
 */
function signToken(user) {
  const cfg = getConfig();
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(payload, cfg.auth.jwtSecret, { expiresIn: cfg.auth.jwtExpiresIn });
}

// PUBLIC_INTERFACE
async function register({ email, password, name }) {
  /** Registers a new user and returns a token and profile. */
  const existing = findUserByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }
  const passwordHash = hashPassword(password);
  const user = createUser({ email, passwordHash, name });
  const token = signToken(user);
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

// PUBLIC_INTERFACE
async function login({ email, password }) {
  /** Authenticates a user and returns a token and profile. */
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }
  const token = signToken(user);
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

module.exports = {
  // PUBLIC_INTERFACE
  register,
  // PUBLIC_INTERFACE
  login,
};

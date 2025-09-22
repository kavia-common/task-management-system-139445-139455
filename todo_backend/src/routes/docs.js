'use strict';

const express = require('express');
const router = express.Router();

/**
 * PUBLIC_INTERFACE
 * GET /api/docs/help
 * Provides basic usage help and notes for the API, including auth usage.
 */
router.get('/help', (req, res) => {
  /** Returns API usage notes for clients. */
  return res.status(200).json({
    title: 'Todo API - Usage Help',
    version: '1.0.0',
    auth: {
      type: 'Bearer JWT',
      header: 'Authorization: Bearer <token>',
      obtain: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      }
    },
    endpoints: {
      health: 'GET /',
      todos: {
        list: 'GET /api/todos',
        create: 'POST /api/todos',
        get: 'GET /api/todos/{id}',
        update: 'PUT /api/todos/{id}',
        delete: 'DELETE /api/todos/{id}',
      }
    }
  });
});

module.exports = router;

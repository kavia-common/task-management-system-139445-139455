const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const todosRoutes = require('./todos');
const docsRoutes = require('./docs');
const { seedDemo } = require('../models/datastore');

const router = express.Router();

// Seed demo data in dev for convenience
seedDemo();

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Service health
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// Mount API routes
router.use('/api/auth', authRoutes);
router.use('/api/todos', todosRoutes);
router.use('/api/docs', docsRoutes);

module.exports = router;

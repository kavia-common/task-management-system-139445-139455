'use strict';

const express = require('express');
const todosController = require('../controllers/todos');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Todos
 *     description: Todo management
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: List todos
 *     description: Returns list of todos for the authenticated user.
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, normal, high]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List returned
 */
router.get('/', authenticate, todosController.list.bind(todosController));

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [low, normal, high]
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', authenticate, todosController.create.bind(todosController));

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Todo data
 *       404:
 *         description: Not found
 */
router.get('/:id', authenticate, todosController.get.bind(todosController));

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               completed: { type: boolean }
 *               dueDate: { type: string, format: date-time }
 *               priority: { type: string, enum: [low, normal, high] }
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', authenticate, todosController.update.bind(todosController));

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', authenticate, todosController.remove.bind(todosController));

module.exports = router;

'use strict';

const todosService = require('../services/todos');

class TodosController {
  /**
   * Create todo
   */
  // PUBLIC_INTERFACE
  async create(req, res) {
    /** Creates a todo for the authenticated user. */
    try {
      const todo = await todosService.create(req.user.id, req.body || {});
      return res.status(201).json({ status: 'ok', data: todo });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * Update todo
   */
  // PUBLIC_INTERFACE
  async update(req, res) {
    /** Updates a todo by id for the authenticated user. */
    try {
      const { id } = req.params;
      const updated = await todosService.update(req.user.id, id, req.body || {});
      return res.status(200).json({ status: 'ok', data: updated });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * Delete todo
   */
  // PUBLIC_INTERFACE
  async remove(req, res) {
    /** Deletes a todo by id for the authenticated user. */
    try {
      const { id } = req.params;
      await todosService.remove(req.user.id, id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * Get todo
   */
  // PUBLIC_INTERFACE
  async get(req, res) {
    /** Retrieves a todo by id for the authenticated user. */
    try {
      const { id } = req.params;
      const todo = await todosService.get(req.user.id, id);
      return res.status(200).json({ status: 'ok', data: todo });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * List todos
   */
  // PUBLIC_INTERFACE
  async list(req, res) {
    /** Lists todos for the authenticated user with optional filters. */
    try {
      const data = await todosService.list(req.user.id, req.query || {});
      return res.status(200).json({ status: 'ok', data });
    } catch (err) {
      return res.status(err.status || 500).json({ status: 'error', message: err.message });
    }
  }
}

module.exports = new TodosController();

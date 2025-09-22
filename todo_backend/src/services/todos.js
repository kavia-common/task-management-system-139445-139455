'use strict';

const { createTodo, updateTodo, deleteTodo, getTodo, listTodos } = require('../models/datastore');

// PUBLIC_INTERFACE
async function create(userId, payload) {
  /** Create a todo for a user. */
  if (!payload || !payload.title || typeof payload.title !== 'string') {
    const err = new Error('Title is required');
    err.status = 400;
    throw err;
  }
  const todo = createTodo({ ...payload, userId });
  return todo;
}

// PUBLIC_INTERFACE
async function update(userId, id, payload) {
  /** Update a todo for a user. */
  const updated = updateTodo(id, userId, payload);
  if (!updated) {
    const err = new Error('Todo not found');
    err.status = 404;
    throw err;
  }
  return updated;
}

// PUBLIC_INTERFACE
async function remove(userId, id) {
  /** Delete a todo for a user. */
  const ok = deleteTodo(id, userId);
  if (!ok) {
    const err = new Error('Todo not found');
    err.status = 404;
    throw err;
  }
  return { success: true };
}

// PUBLIC_INTERFACE
async function get(userId, id) {
  /** Get a single todo for a user. */
  const todo = getTodo(id, userId);
  if (!todo) {
    const err = new Error('Todo not found');
    err.status = 404;
    throw err;
  }
  return todo;
}

// PUBLIC_INTERFACE
async function list(userId, query) {
  /** List todos for a user with optional filters. */
  const filters = {};
  if (typeof query.completed !== 'undefined') {
    filters.completed = String(query.completed) === 'true';
  }
  if (query.search) filters.search = String(query.search);
  if (query.priority) filters.priority = String(query.priority);
  return listTodos(userId, filters);
}

module.exports = {
  // PUBLIC_INTERFACE
  create,
  // PUBLIC_INTERFACE
  update,
  // PUBLIC_INTERFACE
  remove,
  // PUBLIC_INTERFACE
  get,
  // PUBLIC_INTERFACE
  list,
};

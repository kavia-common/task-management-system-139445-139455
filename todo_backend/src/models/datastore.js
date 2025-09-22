'use strict';

/**
 * In-memory datastore to avoid external DB dependency.
 * This can later be swapped with a real database.
 */
const crypto = require('crypto');

// Simple incrementing id generators
let todoIdSeq = 1;
let userIdSeq = 1;

const users = new Map(); // id -> user
const usersByEmail = new Map(); // email -> id
const todos = new Map(); // id -> todo

/**
 * Create a new user
 */
function createUser({ email, passwordHash, name }) {
  const id = String(userIdSeq++);
  const now = new Date().toISOString();
  const user = {
    id,
    email,
    passwordHash,
    name: name || email.split('@')[0],
    createdAt: now,
    updatedAt: now,
  };
  users.set(id, user);
  usersByEmail.set(email.toLowerCase(), id);
  return user;
}

/**
 * Find user by email
 */
function findUserByEmail(email) {
  const id = usersByEmail.get(email.toLowerCase());
  if (!id) return null;
  return users.get(id) || null;
}

/**
 * Find user by id
 */
function findUserById(id) {
  return users.get(String(id)) || null;
}

/**
 * Create a new todo item
 */
function createTodo({ title, description = '', completed = false, userId, dueDate = null, priority = 'normal' }) {
  const id = String(todoIdSeq++);
  const now = new Date().toISOString();
  const todo = {
    id,
    title,
    description,
    completed: Boolean(completed),
    userId: String(userId),
    createdAt: now,
    updatedAt: now,
    dueDate,
    priority, // low | normal | high
  };
  todos.set(id, todo);
  return todo;
}

/**
 * Update a todo by id (only owned by userId)
 */
function updateTodo(id, userId, updates) {
  const todo = todos.get(String(id));
  if (!todo || String(todo.userId) !== String(userId)) return null;
  const updated = {
    ...todo,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  todos.set(String(id), updated);
  return updated;
}

/**
 * Delete a todo by id (only owned by userId)
 */
function deleteTodo(id, userId) {
  const todo = todos.get(String(id));
  if (!todo || String(todo.userId) !== String(userId)) return false;
  return todos.delete(String(id));
}

/**
 * Get a todo by id (only owned by userId)
 */
function getTodo(id, userId) {
  const todo = todos.get(String(id));
  if (!todo || String(todo.userId) !== String(userId)) return null;
  return todo;
}

/**
 * List todos for a user with optional filters
 */
function listTodos(userId, { completed, search, priority } = {}) {
  const result = [];
  for (const todo of todos.values()) {
    if (String(todo.userId) !== String(userId)) continue;
    if (typeof completed === 'boolean' && todo.completed !== completed) continue;
    if (priority && todo.priority !== priority) continue;
    if (search) {
      const s = search.toLowerCase();
      const hay = `${todo.title} ${todo.description}`.toLowerCase();
      if (!hay.includes(s)) continue;
    }
    result.push(todo);
  }
  // Sort by updatedAt desc
  result.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return result;
}

/**
 * Seed a demo user and todo in dev mode for easy testing
 */
function seedDemo() {
  if (usersByEmail.size > 0) return;
  const passwordHash = crypto.createHash('sha256').update('password').digest('hex');
  const demo = createUser({ email: 'demo@example.com', passwordHash, name: 'Demo User' });
  createTodo({ title: 'Welcome to Corporate Navy Todo', description: 'This is your first task', userId: demo.id, priority: 'high' });
}

module.exports = {
  // PUBLIC_INTERFACE
  createUser,
  // PUBLIC_INTERFACE
  findUserByEmail,
  // PUBLIC_INTERFACE
  findUserById,
  // PUBLIC_INTERFACE
  createTodo,
  // PUBLIC_INTERFACE
  updateTodo,
  // PUBLIC_INTERFACE
  deleteTodo,
  // PUBLIC_INTERFACE
  getTodo,
  // PUBLIC_INTERFACE
  listTodos,
  // PUBLIC_INTERFACE
  seedDemo,
};

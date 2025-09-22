# Todo Backend (Express.js) - Corporate Navy

A minimal Express.js backend providing:
- JWT-based authentication (register/login)
- RESTful CRUD for Todos scoped to the authenticated user
- Swagger/OpenAPI docs at /docs with dynamic server URL
- Environment-driven configuration

Run:
- npm install
- npm run dev
- Open /docs for API documentation

Environment:
- See .env.example for required variables. Do not commit .env files.

Key Endpoints:
- GET / (health)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/todos
- POST /api/todos
- GET /api/todos/:id
- PUT /api/todos/:id
- DELETE /api/todos/:id

Notes:
- Uses in-memory datastore for simplicity; replace with a real DB later.
- Default demo account seeded: demo@example.com / password

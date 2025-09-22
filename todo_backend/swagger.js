const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API - Corporate Navy',
      version: '1.0.0',
      description: 'REST API for Todo application with JWT authentication.',
    },
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Todos', description: 'Todo management' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

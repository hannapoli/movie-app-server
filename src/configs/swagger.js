const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie App API',
      version: '1.0.0',
      description: 'API para gestionar usuarios, autenticación, películas, favoritos y archivos subidos.'
    },
    servers: [
      { url: 'http://localhost:4001/api/v1', description: 'Servidor local' },
      { url: 'https://movie-app-ne82.onrender.com/api/v1', description: 'Servidor producción' }
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocument = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerDocument };
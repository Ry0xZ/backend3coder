const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend - Entrega Final",
      version: "1.0.0",
      description: "Documentación de la API (módulo Users)",
    },
  },
  apis: ["./src/docs/*.yaml"], // YAMLs de documentación
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
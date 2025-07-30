import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DoList',
      version: '1.0.0',
      description: 'Documentação da API DoList'
    },
  },
  apis: ['./src/routes/*.js'], // Caminho dos arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
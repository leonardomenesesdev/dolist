import express from 'express';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js'

const app = express();
routes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app;

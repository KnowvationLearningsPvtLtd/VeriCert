import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '../config/config'
import logger from '../utils/logger'



const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'VeriCert API',
        version: '1.0.0',
        description: 'API Documentation for VeriCert',
      },
      servers: [
        {
          url: 'http://localhost:2000/api',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
  };
  
const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app) =>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    logger.info(`Swagger docs available at http://localhost:${config.PORT}/api-docs`)    
}
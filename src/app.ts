import express from 'express';
import config from './config/config';
import logger from './utils/logger';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import rateLimiter from './middlewares/rateLimiter';
import errorHandler from './middlewares/errorHandler';
import { authRouter } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { setupSwagger } from './docs/swagger';
// import mainRouter from './routes';  // Uncomment when mainRouter is ready

const app = express();

// Security middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// CORS setup (Customize origin as needed)
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

// Logging
app.use(morgan('dev'));

// Rate Limiting
app.use(rateLimiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/auth', authRouter); 
app.use('/api/users', userRoutes)
setupSwagger(app);

// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);


app.listen(Number(config.PORT), '127.0.0.1',() => {
  logger.info(`🚀 Server running on PORT:: ${config.PORT}`);
});

export default app;

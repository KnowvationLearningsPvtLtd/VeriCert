
import { Request, Response } from 'express';
import logger from '../utils/logger';

// Custom Error Interface
export interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  logger.error(`Error: ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;

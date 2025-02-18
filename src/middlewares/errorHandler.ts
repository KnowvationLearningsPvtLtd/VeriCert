import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';






export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction ) => {
        logger.error(err);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Serve Error'
        })
}
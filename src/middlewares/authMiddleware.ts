import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      const error = new Error('No token, authorization denied') as any;
      error.statusCode = 401;
      throw error;

    }

    const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;

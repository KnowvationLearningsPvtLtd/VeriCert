// Auth Types here
import { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

// Interface for User Model
export interface IUser {
  username: string;
  password: string;
  role: 'user' | 'admin'; // Adjust based on your role system
}

// Interface for Authenticated Requests
export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

// Interface for Register/Login Request Body
export interface AuthRequestBody {
  username: string;
  password: string;
  role?: string;
}

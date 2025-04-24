import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../middlewares/errorHandler'

interface AuthRequest extends Request {
    user?: { role: string }
}

const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                const error = new Error('Access denied: Insufficient permissions') as CustomError
                error.statusCode = 403
                throw error
            }

            if (!allowedRoles.includes(req.user.role)) {
                const error = new Error('Access denied: Insufficient permissions') as CustomError
                error.statusCode = 403
                throw error
            }

            next()
        } catch (error) {
            next(error) // Pass error to global error handler
        }
    }
}

export default authorizeRoles

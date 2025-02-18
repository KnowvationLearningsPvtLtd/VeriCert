import { NextFunction, Request, Response } from 'express'
import { loginSchema, registerSchema } from '../validations/registerSchema'
import { RegisterInput } from '../types/authTypes'
import { loginService, refreshTokenService, registerService } from '../services/authService'





export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedDate = registerSchema.parse(req.body)
         
        const user = await registerService(validatedDate)
        
        res.status(201).json({
            message: 'User Registered Successfully',
            user
        })
    } catch (err) {
        next(err)
    }
}



export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = loginSchema.parse(req.body)
        const tokens = await loginService(validatedData)

        res.status(200).json(tokens)
    } catch (err) {
        next(err)
    }
}


export const refreshTokenController = async(req: Response, res: Request, next: NextFunction) =>{
    try {
        const { refreshToken } = req.body;

        if(!refreshToken) throw new Error('Refrsh token is required')
         const tokens = await refreshTokenService(refreshToken);

        res.status(200).json(tokens)

    } catch (err) {
        next(err)
    }
}
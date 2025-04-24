import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/userModel'
import { generateAccessToken } from '../utils/jwt'
import logger from '../utils/logger'
import { registerSchema } from '../validations/registerSchema'
import { sendEmail } from '../utils/emailService'

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = registerSchema.safeParse(req.body)

        if (!parsedData.success) {
            return res.status(400).json({ errors: parsedData.error.format() })
        }

        const { username, email, password, role } = parsedData.data
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword, role })

        await newUser.save()
        logger.info(`User registered: ${email}`)

        // Send Welcome Email
        await sendEmail(email, 'Welcome to VeriCert!', `Hello ${username},\n\nYour account has been successfully registered.\n\nBest,\nVeriCert Team`)

        res.status(201).json({ message: `User registered with email ${email}` })
    } catch (err) {
        next(err)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found` })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = generateAccessToken({ _id: user._id, role: user.role })
        logger.info(`User logged in: ${email}`)

        // Send Login Notification Email
        await sendEmail(
            email,
            'New Login Alert',
            `Hello ${user.username},\n\nWe noticed a login to your account.\nIf this wasn't you, please reset your password.\n\nBest,\nVeriCert Team`
        )

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        next(err)
    }
}

const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' })
    } catch (err) {
        next(err)
    }
}

export { register, login, logout }

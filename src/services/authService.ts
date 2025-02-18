import bcrypt from 'bcrypt'
import { AuthTokens, LoginInput, RegisterInput, UserProfile } from '../types/authTypes'
import { User } from '../models/userModel';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';




export const registerService = async ({ email, password, role}: RegisterInput): Promise<UserProfile> => {
    const existingUser = await User.findOne({ email });

    if(existingUser) throw new Error('User already exists')

        const hashedPassword: string = await bcrypt.hash(password, 10)

        const newUser = await User.create({ email, password: hashedPassword, role})

        return newUser;
    }

export const loginService = async ({email, password}: LoginInput): Promise<AuthTokens> => {
    const user = await User.findOne({ email }).select('+password')
   
    if(!user) throw new Error('Invalid email or password')

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) throw new Error('Invalid Email or Password')

            return {
                accessToken: generateAccessToken(user),
                refreshToken: generateRefreshToken(user),
            }
}


export const refreshTokenService = async (token: string): Promise<{ accessToken: string}> => {
    const decoded = verifyToken(token)
    
    const user = await User.findOne(decoded.id)
    if(!user) throw new Error('Invalid Token')

        return {
            accessToken: generateAccessToken(user)
        }
}
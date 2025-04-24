import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

interface Config {
    ENV: string
    JWT_SECRET: string
    REFRESH_SECRET: string
    PORT: number
    SERVER_URL: string
    DB_URL: string

    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_USER: string
    EMAIL_PASS: string
}

const config: Config = {
    ENV: process.env.ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'default_refresh_secret',

    PORT: Number(process.env.PORT) || 2000,
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:2000',
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/vericert',

    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
    EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
    EMAIL_USER: process.env.EMAIL_USER || '',
    EMAIL_PASS: process.env.EMAIL_PASS || ''
}

export default config

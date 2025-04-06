import dotenvFlow from 'dotenv-flow';

dotenvFlow.config()

export default {
    ENV: process.env.ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET, 
    
    PORT: process.env.PORT || 3000,
    SERVER_URL: process.env.SERVER_URL,
    DB_URL: process.env.DB_URL
}

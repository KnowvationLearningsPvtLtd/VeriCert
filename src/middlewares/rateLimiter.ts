import rateLimit from 'express-rate-limit'

// Define rate limiter: limits each IP to 100 requests per 15 minutes
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    },
    headers: true, // Send rate limit info in response headers
    standardHeaders: true, // Inform the client about rate limit in headers
    legacyHeaders: false // Disable `X-RateLimit-*` headers
})

export default rateLimiter

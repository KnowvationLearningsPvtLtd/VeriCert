/* eslint-disable @typescript-eslint/no-base-to-string */
import { createLogger, format, transports } from 'winston'
import util from 'util'
import winston from 'winston'

// Define color styles for different log levels
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
}

const colorizer = format.colorize()

const consoleLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    return (
        colorizer.colorize(level, `${level.toUpperCase()} [${String(timestamp)}]`) +
        ` ${String(message)}\nMETA: ${util.inspect(meta, { depth: null })}\n`
    )
})

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
    defaultMeta: { service: 'auth-service' },
    transports: [
        new transports.Console({
            format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.colorize(), consoleLogFormat)
        }),
        new transports.File({ filename: 'logs/auth-service.log' , level: 'error'})
    ]
})

winston.addColors(logColors)

export default logger

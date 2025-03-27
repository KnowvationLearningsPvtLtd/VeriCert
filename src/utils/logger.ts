import winston, { createLogger, format, transports, addColors } from 'winston';
import util from 'util';

// Define log level colors
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'blue',
};

// Apply colors to Winston
addColors(logColors);

// Custom console log format

const consoleLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
  const colorizer = winston.format.colorize();

  const safeTimestamp = typeof timestamp === 'string' ? timestamp : new Date().toISOString();
  const safeMessage = typeof message === 'string' ? message : util.inspect(message, { depth: null });
  const metaString = Object.keys(meta).length 
    ? `\nMETA: ${util.inspect(meta, { depth: null })}` 
    : '';
  const logMessage = `${level.toUpperCase()} -- [${safeTimestamp}] ${safeMessage} ${metaString}\n`;
  return colorizer.colorize(level, logMessage);
});

// Create the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleLogFormat
      ),
    }),
    new transports.File({ filename: 'logs/auth-service.log', level: 'error' }),
  ],
});

export default logger;

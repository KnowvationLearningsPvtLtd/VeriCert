import dotenv from 'dotenv';
import config from './config/config';
import logger from './utils/logger';
import dbConnect from './config/dbConnect';
import app from './app'; // Import the configured Express app

// Load environment variables
dotenv.config();

// Connect to the database, then start the server
const startServer = async () => {
  try {
    await dbConnect();
    app.listen(Number(config.PORT), () => {
      logger.info(`🚀 Server is running on PORT:: ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1); // Exit the process with failure
  }
};

void startServer();

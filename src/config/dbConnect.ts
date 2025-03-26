import mongoose from 'mongoose';
import logger from '../utils/logger';

const dbConnect = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect('mongodb+srv://admin:abcd1234@cluster0.242bnlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    logger.info(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    logger.error('Database connection error:', err);
    process.exit(1);
  }
};

export default dbConnect;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel'; // Adjust path if needed
const logger = console;

dotenv.config();

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/myDatabase';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    logger.info(' MongoDB Connected!');

    // Clear existing users
    await User.deleteMany();
    logger.info(' Existing users removed!');

    // Seed users
    const users = [
      { username: 'adminUser', password: 'password123', role: 'admin' },
      { username: 'orgUser', password: 'password123', role: 'organization' },
      { username: 'regularUser', password: 'password123', role: 'user' }
    ];

    // Hash passwords
    for (const user of users) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    // Insert users
    await User.insertMany(users);
    logger.info('Users seeded successfully!');

    // Close DB connection
    await mongoose.disconnect();
    logger.info(' MongoDB Disconnected!');
  } catch (error) {
    logger.error(' Seeding Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};


void seedDatabase(); 

logger.info('Seeding completed successfully!');

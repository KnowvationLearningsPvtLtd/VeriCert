// tests/userModel.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/userModel'; // Adjust path as needed

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Model Test Suite', () => {
  it('should create & save a user successfully', async () => {
    const userData = {
      username: 'innovator1',
      email: 'innovator1@example.com',
      password: 'securePass123',
      role: 'user',
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe(userData.role);
  });

  it('should not allow duplicate email or username', async () => {
    const userData = {
      username: 'duplicateUser',
      email: 'dupe@example.com',
      password: 'pass123',
      role: 'organization',
    };
    await new User(userData).save();
    await expect(new User(userData).save()).rejects.toThrow();
  });

  it('should require a valid email format', async () => {
    const invalidEmailUser = new User({
      username: 'bademailuser',
      email: 'bademail.com',
      password: 'pass123',
      role: 'user',
    });
    await expect(invalidEmailUser.save()).rejects.toThrow();
  });

  it('should enforce required fields', async () => {
    const user = new User({});
    await expect(user.save()).rejects.toThrow();
  });
});

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import User from '../../../src/models/userModel'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await User.syncIndexes()
})

afterAll(async () => {
    await mongoose.connection.close()
    await mongoServer.stop()
})

afterEach(async () => {
    await User.deleteMany({})
})

describe('User Model Test Suite', () => {
    it('should create & save a user successfully', async () => {
        const userData = {
            username: 'innovator1',
            email: 'innovator1@example.com',
            password: 'securePass123',
            role: 'user'
        }
        const savedUser = await new User(userData).save()

        expect(savedUser._id).toBeDefined()
        expect(savedUser.username).toBe(userData.username)
        expect(savedUser.email).toBe(userData.email)
        expect(savedUser.role).toBe(userData.role)
    })

    it('should not allow duplicate email or username', async () => {
        const userData1 = {
            username: 'duplicateUser',
            email: 'dupe@example.com',
            password: 'pass123',
            role: 'organization'
        }

        const userData2 = {
            username: 'duplicateUser',
            email: 'dupe@example.com',
            password: 'pass456',
            role: 'organization'
        }

        await new User(userData1).save()

        await expect(new User(userData2).save()).rejects.toMatchObject({
            name: 'MongoServerError',
            code: 11000
        })
    })

    it('should require a valid email format', async () => {
        const invalidEmailUser = new User({
            username: 'bademailuser',
            email: 'bademail.com',
            password: 'pass123',
            role: 'user'
        })

        let error
        try {
            await invalidEmailUser.save()
        } catch (err: any) {
            error = err
        }

        expect(error).toBeDefined()
        expect(error.name).toBe('ValidationError')
        expect(error.errors.email).toBeDefined()
    })

    it('should enforce required fields', async () => {
        const user = new User({})

        let error
        try {
            await user.save()
        } catch (err: any) {
            error = err
        }

        expect(error).toBeDefined()
        expect(error.name).toBe('ValidationError')
        expect(error.errors.username).toBeDefined()
        expect(error.errors.email).toBeDefined()
        expect(error.errors.password).toBeDefined()
        expect(error.errors.role).toBeDefined()
    })
})

import jwt from 'jsonwebtoken'
import * as configModule from '../../src/config/config'
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../src/utils/jwt'

jest.mock('jsonwebtoken')
const mockSign = jwt.sign as jest.Mock
const mockVerify = jwt.verify as jest.Mock

describe('JWT Utilities', () => {
    const user = { _id: 'user123', role: 'admin' }
    const mockJWTSecret = 'test_jwt_secret'
    const mockRefreshSecret = 'test_refresh_secret'

    beforeAll(() => {
        // @ts-expert-error
        configModule.default.JWT_SECRET = mockJWTSecret
        // @ts-expert-error
        configModule.default.REFRESH_SECRET = mockRefreshSecret
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should generate an access token', () => {
        mockSign.mockReturnValue('mockAccessToken')

        const token = generateAccessToken(user)

        expect(mockSign).toHaveBeenCalledWith({ id: user._id, role: user.role }, mockJWTSecret, { expiresIn: '15m' })
        expect(token).toBe('mockAccessToken')
    })

    it('should generate a refresh token', () => {
        mockSign.mockReturnValue('mockRefreshToken')

        const token = generateRefreshToken(user)

        expect(mockSign).toHaveBeenCalledWith({ id: user._id }, mockRefreshSecret, { expiresIn: '7d' })
        expect(token).toBe('mockRefreshToken')
    })

    it('should verify a token', () => {
        const mockPayload = { id: 'user123', role: 'admin' }
        mockVerify.mockReturnValue(mockPayload)

        const result = verifyToken('mockToken')

        expect(mockVerify).toHaveBeenCalledWith('mockToken', mockJWTSecret)
        expect(result).toEqual(mockPayload)
    })
})

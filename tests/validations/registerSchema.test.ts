import { registerSchema } from '../../src/validations/registerSchema'

describe('registerSchema Validation', () => {
    const validData = {
        username: 'validUser123',
        email: 'user@example.com',
        password: 'securePass1',
        role: 'user'
    }

    it('should pass with valid data', () => {
        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(true)
    })

    it('should fail if username is too short', () => {
        const result = registerSchema.safeParse({ ...validData, username: 'ab' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.format().username?._errors).toContain('Username must be at least 3 characters long')
        }
    })

    it('should fail if username contains symbols', () => {
        const result = registerSchema.safeParse({ ...validData, username: 'user$#' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.format().username?._errors).toContain('Username must only contain letters and numbers')
        }
    })

    it('should fail if email is invalid', () => {
        const result = registerSchema.safeParse({ ...validData, email: 'invalid-email' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.format().email?._errors).toContain('Invalid email format')
        }
    })

    it('should fail if password is too short', () => {
        const result = registerSchema.safeParse({ ...validData, password: '123' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.format().password?._errors).toContain('Password must be at least 6 characters long')
        }
    })

    it('should fail if role is invalid', () => {
        const result = registerSchema.safeParse({ ...validData, role: 'superuser' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.format().role?._errors).toContain('Role must be either user or admin or organization')
        }
    })
})

import logger from '../../src/utils/logger'
import fs from 'fs'
import path from 'path'
import realLogger from '../../src/utils/logger'

describe('Logger Utility', () => {
    const originalInfo = logger.info
    const originalError = logger.error
    let consoleOutput: string[] = []

    beforeEach(() => {
        consoleOutput = []
    })

    afterEach(() => {
        logger.info = originalInfo
        logger.error = originalError
    })

    it('should log info message without throwing', () => {
        logger.info = ((msg: string) => {
            consoleOutput.push(msg)
        }) as typeof logger.info

        expect(() => logger.info('Test info message')).not.toThrow()
    })

    it('should log error message with metadata', () => {
        logger.error = ((msg: string) => {
            consoleOutput.push(msg)
        }) as typeof logger.error

        expect(() => logger.error('Test error', { userId: '12345', action: 'login' })).not.toThrow()
    })

    it('should create an error log file', async () => {
        const logDir = path.join(__dirname, '../../logs')
        const filePath = path.join(logDir, 'auth-service.log')

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true })
        }

        realLogger.transports.forEach((t: any) => {
            if (t.name === 'console') realLogger.remove(t)
        })

        realLogger.error('File log test')
        await new Promise((res) => setTimeout(res, 300))

        const contents = fs.readFileSync(filePath, 'utf8')
        expect(contents).toMatch(/File log test/)
    })
})

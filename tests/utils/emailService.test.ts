import nodemailer from 'nodemailer'
import { sendEmail } from '../../src/utils/emailService'
import logger from '../../src/utils/logger'

jest.mock('nodemailer')

const sendMailMock = jest.fn()

;(nodemailer.createTransport as jest.Mock).mockReturnValue({
    sendMail: sendMailMock
})

describe('sendEmail', () => {
    const mockData = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Body'
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should send an email successfully', async () => {
        sendMailMock.mockResolvedValueOnce({ messageId: '123' })

        await sendEmail(mockData.to, mockData.subject, mockData.text)

        expect(nodemailer.createTransport).toHaveBeenCalled()
        expect(sendMailMock).toHaveBeenCalledWith({
            from: expect.stringContaining('VeriCert'),
            to: mockData.to,
            subject: mockData.subject,
            text: mockData.text
        })
    })

    it('should log error if sending fails', async () => {
        const error = new Error('Failed to send')
        sendMailMock.mockRejectedValueOnce(error)

        const loggerSpy = jest.spyOn(logger, 'error').mockImplementation()

        await sendEmail(mockData.to, mockData.subject, mockData.text)

        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('❌ Email failed:'))
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to send'))

        loggerSpy.mockRestore()
    })
})

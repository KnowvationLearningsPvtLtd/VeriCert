import logger from '../../src/utils/logger';
import fs from 'fs';

describe('Logger Utility', () => {
  const originalInfo = logger.info;
  const originalError = logger.error;
  let consoleOutput: string[] = [];

  beforeEach(() => {
    consoleOutput = [];

    logger.info = ((msg: string) => {
      consoleOutput.push(msg);
    }) as typeof logger.info;
    
    logger.error = ((msg: string) => {
      consoleOutput.push(msg);
    }) as typeof logger.error;
    
    
  });

  afterEach(() => {
    logger.info = originalInfo;
    logger.error = originalError;
  });

  it('should log info message without throwing', () => {
    expect(() => logger.info('Test info message')).not.toThrow();
  });

  it('should log error message with metadata', () => {
    expect(() =>
      logger.error('Test error', { userId: '12345', action: 'login' })
    ).not.toThrow();
  });

  it('should create an error log file', async () => {
    logger.error('File log test');
    const filePath = 'logs/auth-service.log';

    await new Promise(res => setTimeout(res, 200));

    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);

    const contents = fs.readFileSync(filePath, 'utf8');
    expect(contents).toMatch(/File log test/);
  });
});

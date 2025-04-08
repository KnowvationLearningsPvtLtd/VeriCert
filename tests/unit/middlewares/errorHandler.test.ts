import { Request, Response } from 'express';
import errorHandler, { CustomError } from '../../../src/middlewares/errorHandler';
import logger from '../../../src/utils/logger';

jest.mock('../../../src/utils/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    req = {};
    res = {
      status: statusMock,
    };
  });

  it('should handle custom errors with status code', () => {
    const error: CustomError = {
      name: 'CustomError',
      message: 'Something went wrong',
      statusCode: 400,
    };

    errorHandler(error, req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong',
    });
    expect(logger.error).toHaveBeenCalledWith('Error: Something went wrong');
  });

  it('should default to 500 if no statusCode is provided', () => {
    const error: CustomError = {
      name: 'UnknownError',
      message: 'Unexpected failure',
    };

    errorHandler(error, req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Unexpected failure',
    });
    expect(logger.error).toHaveBeenCalledWith('Error: Unexpected failure');
  });

  it('should default message to Internal Server Error if none provided', () => {
    const error: CustomError = {
      name: 'EmptyError',
      message: '', 
    };

    errorHandler(error, req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error',
    });
    expect(logger.error).toHaveBeenCalledWith('Error: ');
  });
});

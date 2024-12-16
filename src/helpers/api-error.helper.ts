import HttpStatusCodes from '@constants/Http-status-codes.constants';

class ExtendableError extends Error {
    errorCode: number;
    status: number;
    isOperational: boolean;

    constructor(error : { message: string, code: number } | string, status: number) {
        const  errorMessage: string = typeof error === 'string' ? error : error.message;
        super(errorMessage);
        this.name = this.constructor.name;
        this.message = errorMessage;
        this.errorCode = typeof error === 'object' && 'code' in error ? error.code : status;
        this.status = status;
        this.isOperational = true;
        const omitFromStackTrace = () => {};
        Error.captureStackTrace(this, omitFromStackTrace);
    }
}

class APIError extends ExtendableError {
    constructor(
        error: { message: string; code: number} | string,
        status: HttpStatusCodes = HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ) {
        super(error, status);
    }
}

export { APIError };
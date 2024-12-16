import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

import env from '@configs/env.config';

import { NodeEnvs } from '@constants/misc.constant';
import Errors from '@constants/errors.constant';
import HttpStatusCodes from "@constants/Http-status-codes.constants";

import { APIError } from '@helpers/api-error.helper';

class ErrorMiddleware {
    handle(
        error: Error | ValidationError | APIError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        let status: number = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        let errorCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        let message: string = '';

        if (error instanceof Error) {
            message = error.message;
        }

        if (error instanceof ValidationError) {
            status = HttpStatusCodes.BAD_REQUEST;
            errorCode = Errors.EXPRESS.VALIDATION.code;
            if (error.details.params) {
                message = error.details.params[0].message;
            }
            if (error.details.query) {
                message = error.details.query[0].message;
            }
            if (error.details.body) {
                message = error.details.body[0].message;
            }
        }
        if (error instanceof APIError) {
            status = error.status;
            errorCode = error.errorCode;
            message = error.message;
        }
        
        res.status(status).json({
            success: false,
            message,
            errorCode,
            status,
            stack : env.NODE_ENV === NodeEnvs.DEVELOPMENT ? error.stack : undefined,
        });
    }
}

export default ErrorMiddleware;
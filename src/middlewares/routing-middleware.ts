import { NextFunction, Request, Response } from "express";

import { APIError } from '@helpers/api-error.helper';

import Errors from '@constants/errors.constant';
import HttpStatusCodes from '@constants/Http-status-codes.constants';

class RoutingMiddleware {
    notFound = (req: Request, res: Response, next: NextFunction) => {
        next (new APIError(Errors.EXPRESS.NOT_FOUND, HttpStatusCodes.NOT_FOUND));
    };
}

export default RoutingMiddleware;
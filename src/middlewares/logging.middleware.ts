import { NextFunction, Request, Response } from "express";
import debug from "debug";

import appConfig from '@configs/app.config';

const logger = debug(appConfig.MESSAGES.DEBUG_NAMESPACES.LOGGING_MIDDLEWARE);

class LoggingMiddleware {
    console = (err: Error, req: Request, res: Response, next: NextFunction) => {
        const currentDate: Date = new Date();
        logger(`${req.method} ${req.originalUrl ?? req.url} ${currentDate}`);
        logger(`Error: ${err.message}`);

        next(err);
    };
}

export default LoggingMiddleware;
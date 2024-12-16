import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Response {
            success: (data: unknown) => void;
        }
    }
}

class ResponseMiddleware {

    setup = (req: Request, res: Response, next: NextFunction) => {
        res.success = (data: unknown) => {
            res.status(200).json({ success: true, data});
        };
        next();
    };
}

export default ResponseMiddleware;
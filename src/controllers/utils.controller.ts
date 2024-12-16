import { NextFunction, Request, Response } from "express";
import os from 'os';

import env from '@configs/env.config';

import UtilsHelper from '@helpers/utils.helper';

import pJson from '@root/package.json';

class UtilsController {
    private utilsHelper = new UtilsHelper();

    checkHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const currentDate: Date = new Date();
        const timestamp: string = currentDate.toISOString().replace(/T/,' ').replace(/\..+/,'');
        const uptimerInSeconds: number = process.uptime();
        const uptimeInHours: number = Math.floor(uptimerInSeconds / 3600);

        const cpuUsage: number = (os.loadavg()[0] / os.cpus().length) * 100;

        const totalMemory: number = os.totalmem();
        const usedMemory: number = totalMemory - os.freemem();
        const memoryUsage: number = (usedMemory / totalMemory) * 100;

        const message: string = this.utilsHelper.generateFunnyMessage();

        return res.success({
            version: pJson.version,
            environment: env.NODE_ENV,
            server: {
                timestamp,
                state: 'running',
                uptime: `${uptimeInHours} hours`,
                cpu: `${cpuUsage.toFixed(2)}%`,
                memory: `${memoryUsage.toFixed(2)}%`,
            },
            message,
        });
    };

    keepAlive = async( req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.success('pong');
    };
}

export default UtilsController;
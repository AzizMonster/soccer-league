import express, { Application } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import debug, { Debugger } from 'debug';

import env from "@configs/env.config";
import appConfig from "@configs/app.config";

import { NodeEnvs } from "@constants/misc.constant";

import ResponseMiddleware from '@middlewares/response.middleware';
import RoutingMiddleware from '@middlewares/routing-middleware';
import LoggingMiddleware from '@middlewares/logging.middleware';
import ErrorMiddleware from '@middlewares/error-middleware';

import v1Router from '@routes/v1/index.route';

import FigletHelper from '@helpers/figlet.helper';

const app: Application = express();

env.NODE_ENV === NodeEnvs.PRODUCTION ? app.use(morgan('combined')) : app.use(morgan('dev'));

app.use(helmet());

app.use(cors({ origin: '*' }));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const responseMiddleware = new ResponseMiddleware();
const routingMiddleware = new RoutingMiddleware();
const loggingMiddleware = new LoggingMiddleware();
const errorMiddleware = new ErrorMiddleware();

app.use(responseMiddleware.setup);

app.use('/api/v1', v1Router);

app.use(routingMiddleware.notFound);

app.use(loggingMiddleware.console);

app.use(errorMiddleware.handle);

const serverLogger: Debugger = debug(appConfig.MESSAGES.DEBUG_NAMESPACES.SERVER);

app.listen(env.PORT, () => {
    
    serverLogger(`${appConfig.MESSAGES.SERVER_IS_STARTING} ${env.PORT}...`);
    const figletHelper = new FigletHelper();
    figletHelper.displayAsciiArt(appConfig.NAME);
});

export default app;
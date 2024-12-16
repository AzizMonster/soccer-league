import express, { Router } from 'express';

import utilsRouter from '@routes/v1/utils.route';
import userRouter from '@routes/v1/user.routes';
import authRouter from '@routes/v1/auth.routes';

const v1Router: Router = express.Router();

v1Router.use('/utils', utilsRouter);
v1Router.use('/users', userRouter);
v1Router.use('/auth', authRouter);



export default v1Router;
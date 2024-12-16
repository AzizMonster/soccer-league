import express, { Router } from 'express';

import UtilsController from '@controllers/utils.controller';

const utilsRouter: Router = express.Router();
const utilsController = new UtilsController();

utilsRouter.route('/health-check').get(utilsController.checkHealth);
utilsRouter.route('/keep-alive').get(utilsController.keepAlive);

export default utilsRouter;
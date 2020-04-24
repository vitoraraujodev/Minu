import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import EstablishmentsController from './app/controllers/EstablishmentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/establishments', EstablishmentsController.store);
routes.put('/establishments', authMiddleware, EstablishmentsController.update);

export default routes;

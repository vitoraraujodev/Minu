import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import EstablishmentsController from './app/controllers/EstablishmentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/establishments', EstablishmentsController.store);

export default routes;

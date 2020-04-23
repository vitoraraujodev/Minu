import { Router } from 'express';

import EstablishmentsController from './app/controllers/EstablishmentController';

const routes = new Router();

routes.post('/establishments', EstablishmentsController.store);

export default routes;

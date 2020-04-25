import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import EstablishmentsController from './app/controllers/EstablishmentController';
import FileController from './app/controllers/FileController';
import MenuController from './app/controllers/MenuController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/establishments', EstablishmentsController.store);
routes.put('/establishments', authMiddleware, EstablishmentsController.update);

routes.post('/menus', authMiddleware, MenuController.store);
routes.put('/menus/:id', authMiddleware, MenuController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

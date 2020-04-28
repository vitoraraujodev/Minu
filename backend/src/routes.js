import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import EstablishmentsController from './app/controllers/EstablishmentController';
import FileController from './app/controllers/FileController';
import MenuController from './app/controllers/MenuController';
import ItemController from './app/controllers/ItemController';
import MenuItemController from './app/controllers/MenuItemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/establishments', EstablishmentsController.store);
routes.put('/establishments', authMiddleware, EstablishmentsController.update);

routes.get('/menus', authMiddleware, MenuController.index);
routes.post('/menus', authMiddleware, MenuController.store);
routes.put('/menus/:id', authMiddleware, MenuController.update);
routes.delete('/menus/:id', authMiddleware, MenuController.delete);

routes.get('/items', authMiddleware, ItemController.index);
routes.post('/items', authMiddleware, ItemController.store);
routes.put('/items/:id', authMiddleware, ItemController.update);
routes.delete('/items/:id', authMiddleware, ItemController.delete);

routes.post('/menuitems', authMiddleware, MenuItemController.store);
routes.delete('/menuitems/:id', authMiddleware, MenuItemController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

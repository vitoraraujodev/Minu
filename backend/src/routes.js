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
import AdditionalController from './app/controllers/AdditionalController';
import ItemAdditionalController from './app/controllers/ItemAdditionalController';
import OrderController from './app/controllers/OrderController';

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

routes.post('/menu-items', authMiddleware, MenuItemController.store);
routes.delete('/menu-items/:id', authMiddleware, MenuItemController.delete);

routes.get('/additionals', authMiddleware, AdditionalController.index);
routes.post('/additionals', authMiddleware, AdditionalController.store);
routes.put('/additionals/:id', authMiddleware, AdditionalController.update);
routes.delete('/additionals/:id', authMiddleware, AdditionalController.delete);

routes.post(
  '/item-additionals',
  authMiddleware,
  ItemAdditionalController.store
);
routes.delete(
  '/item-additionals/:id',
  authMiddleware,
  ItemAdditionalController.delete
);

routes.get('/orders', authMiddleware, OrderController.index);
routes.post('/orders', authMiddleware, OrderController.store);
routes.delete('/orders/:id', OrderController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

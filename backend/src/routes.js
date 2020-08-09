import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import PinController from './app/controllers/PinController';
import EstablishmentsController from './app/controllers/EstablishmentController';
import FileController from './app/controllers/FileController';
import MenuController from './app/controllers/MenuController';
import ItemController from './app/controllers/ItemController';
import MenuItemController from './app/controllers/MenuItemController';
import AdditionalController from './app/controllers/AdditionalController';
import OrderController from './app/controllers/OrderController';
import EstablishmentRatingController from './app/controllers/EstablishmentRatingController';
import ItemRatingController from './app/controllers/ItemRatingController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/pin', authMiddleware, PinController.store);

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

routes.get('/orders', authMiddleware, OrderController.index);
routes.post('/orders', OrderController.store);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/establishments/:id/ratings', EstablishmentRatingController.index);
routes.post('/establishments/:id/ratings', EstablishmentRatingController.store);

routes.get('/items/:id/ratings', ItemRatingController.index);
routes.post('/items/:id/ratings', ItemRatingController.store);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);
routes.delete('/files/:id', authMiddleware, FileController.delete);

export default routes;

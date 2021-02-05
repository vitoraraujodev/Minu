import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import establishmentAuthMiddleware from './app/middlewares/establishmentAuth';
import customerAuthMiddleware from './app/middlewares/customerAuth';

import EstablishmentSessionController from './app/controllers/EstablishmentSessionController';
import PinController from './app/controllers/PinController';
import EstablishmentsController from './app/controllers/EstablishmentController';
import FileController from './app/controllers/FileController';
import MenuController from './app/controllers/MenuController';
import ItemController from './app/controllers/ItemController';
import AdditionalController from './app/controllers/AdditionalController';
import EstablishmentRatingController from './app/controllers/EstablishmentRatingController';
import ItemRatingController from './app/controllers/ItemRatingController';

import CustomerController from './app/controllers/CustomerController';
import CustomerSessionController from './app/controllers/CustomerSessionController';
import AvatarController from './app/controllers/AvatarController';
import ServiceSessionController from './app/controllers/ServiceSessionController';
import ServiceMenuController from './app/controllers/ServiceMenuController';

import WaiterCallController from './app/controllers/WaiterCallController';

const routes = new Router();

const customerUpload = multer(MulterConfig.getCustomerConfig());
const establishmentUpload = multer(MulterConfig.getEstablishmentConfig());
const productUpload = multer(MulterConfig.getProductConfig());

routes.post('/establishment-sessions', EstablishmentSessionController.store);
routes.post('/customer-sessions', CustomerSessionController.store);
routes.post('/pin', establishmentAuthMiddleware, PinController.store);

routes.get(
  '/service-sessions',
  customerAuthMiddleware,
  ServiceSessionController.index
);
routes.post(
  '/service-sessions',
  customerAuthMiddleware,
  ServiceSessionController.store
);
routes.delete(
  '/service-sessions',
  customerAuthMiddleware,
  ServiceSessionController.delete
);

routes.get(
  '/service-menu',
  customerAuthMiddleware,
  ServiceMenuController.index
);

routes.get('/establishments/:id', EstablishmentsController.index);
routes.post('/establishments', EstablishmentsController.store);
routes.put(
  '/establishments',
  establishmentAuthMiddleware,
  EstablishmentsController.update
);

routes.get('/menus', establishmentAuthMiddleware, MenuController.index);
routes.post('/menus', establishmentAuthMiddleware, MenuController.store);
routes.put('/menus/:id', establishmentAuthMiddleware, MenuController.update);
routes.delete('/menus/:id', establishmentAuthMiddleware, MenuController.delete);

routes.get('/items', establishmentAuthMiddleware, ItemController.index);
routes.post('/items', establishmentAuthMiddleware, ItemController.store);
routes.put('/items/:id', establishmentAuthMiddleware, ItemController.update);
routes.delete('/items/:id', establishmentAuthMiddleware, ItemController.delete);

routes.get(
  '/additionals',
  establishmentAuthMiddleware,
  AdditionalController.index
);
routes.post(
  '/additionals',
  establishmentAuthMiddleware,
  AdditionalController.store
);
routes.put(
  '/additionals/:id',
  establishmentAuthMiddleware,
  AdditionalController.update
);
routes.delete(
  '/additionals/:id',
  establishmentAuthMiddleware,
  AdditionalController.delete
);

routes.get('/establishments/:id/ratings', EstablishmentRatingController.index);
routes.post('/establishments/:id/ratings', EstablishmentRatingController.store);

routes.get('/items/:id/ratings', ItemRatingController.index);
routes.post('/items/:id/ratings', ItemRatingController.store);

routes.post(
  '/establishment-photo',
  establishmentAuthMiddleware,
  establishmentUpload.single('file'),
  FileController.store
);

routes.post(
  '/product-photo',
  establishmentAuthMiddleware,
  productUpload.single('file'),
  FileController.store
);

routes.post(
  '/avatar',
  customerAuthMiddleware,
  customerUpload.single('file'),
  AvatarController.store
);

routes.post('/customers', CustomerController.store);
routes.put('/customers', customerAuthMiddleware, CustomerController.update);

routes.post('/waiter-call', customerAuthMiddleware, WaiterCallController.store);
routes.delete(
  '/waiter-call',
  establishmentAuthMiddleware,
  WaiterCallController.delete
);

export default routes;

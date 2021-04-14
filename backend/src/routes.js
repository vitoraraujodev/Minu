import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import establishmentAuthMiddleware from './app/middlewares/establishmentAuth';
import customerAuthMiddleware from './app/middlewares/customerAuth';

import EstablishmentSessionController from './app/controllers/Establishment/EstablishmentSessionController';
import PinController from './app/controllers/Establishment/PinController';
import EstablishmentController from './app/controllers/Establishment/EstablishmentController';
import AddressController from './app/controllers/Establishment/AddressController';
import FileController from './app/controllers/Establishment/FileController';
import MenuController from './app/controllers/Establishment/MenuController';
import ItemController from './app/controllers/Establishment/ItemController';
import AdditionalController from './app/controllers/Establishment/AdditionalController';
import EstablishmentRatingController from './app/controllers/Establishment/EstablishmentRatingController';
import ItemRatingController from './app/controllers/Establishment/ItemRatingController';
import EmailCheckController from './app/controllers/Establishment/EmailCheckController';

import CustomerController from './app/controllers/Customer/CustomerController';
import CustomerSessionController from './app/controllers/Customer/CustomerSessionController';
import AvatarController from './app/controllers/Customer/AvatarController';

import ServiceSessionController from './app/controllers/ServiceSession/ServiceSessionController';
import ServiceMenuController from './app/controllers/ServiceSession/ServiceMenuController';
import WaiterCallController from './app/controllers/ServiceSession/WaiterCallController';
import BillCallController from './app/controllers/ServiceSession/BillCallController';
import OpenCallsController from './app/controllers/ServiceSession/OpenCallsController';
import TableSessionsController from './app/controllers/ServiceSession/TableSessionsController';

const routes = new Router();

const customerUpload = multer(MulterConfig.getCustomerConfig());
const establishmentUpload = multer(MulterConfig.getEstablishmentConfig());
const productUpload = multer(MulterConfig.getProductConfig());

routes.post('/establishment-sessions', EstablishmentSessionController.store);
routes.post('/customer-sessions', CustomerSessionController.store);
routes.post('/pin', establishmentAuthMiddleware, PinController.store);

routes.post('/email-check', EmailCheckController.index);

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

routes.get('/establishments/:id', EstablishmentController.index);
routes.post('/establishments', EstablishmentController.store);
routes.put(
  '/establishments',
  establishmentAuthMiddleware,
  EstablishmentController.update
);

routes.put('/addresses', establishmentAuthMiddleware, AddressController.update);

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

routes.post('/waiter-call', WaiterCallController.store);
routes.delete(
  '/waiter-call',
  establishmentAuthMiddleware,
  WaiterCallController.delete
);

routes.post('/bill-call', BillCallController.store);
routes.delete(
  '/bill-call',
  establishmentAuthMiddleware,
  BillCallController.delete
);

routes.get(
  '/open-calls',
  establishmentAuthMiddleware,
  OpenCallsController.index
);

routes.get(
  '/open-table-sessions',
  establishmentAuthMiddleware,
  TableSessionsController.index
);

routes.post(
  '/open-table-session',
  establishmentAuthMiddleware,
  TableSessionsController.store
);

routes.post(
  '/close-table-session',
  establishmentAuthMiddleware,
  TableSessionsController.delete
);

export default routes;

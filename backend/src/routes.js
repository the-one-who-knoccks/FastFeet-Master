import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliverymanOrderController from './app/controllers/DeliverymanOrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.get('/deliverymans/:id', DeliverymanController.index);

routes.get('/deliveryman/:id/orders', DeliverymanOrderController.index);
routes.put(
  '/deliveryman/:id/order/:orderId',
  DeliverymanOrderController.update
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymans', DeliverymanController.index);

routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/delivery-problems', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;

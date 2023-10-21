import express from 'express';
import { getGymSuppliments } from '../Controllers/storeControllers.js';

const Router = express.Router();

Router.get('/getProducts', getGymSuppliments);

export default Router;
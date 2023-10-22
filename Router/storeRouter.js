import express from 'express';
import { getProducts } from '../Controllers/storeControllers.js';


const Router = express.Router();

Router.get('/getProducts/:product', getProducts);

export default Router;
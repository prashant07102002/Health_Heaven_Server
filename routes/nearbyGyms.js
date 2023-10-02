import express from 'express';
import { getNearbyGyms } from '../controllers/nearbyGyms.js';

const Router = express.Router();

Router.get('/nearbyGyms', getNearbyGyms);

export default Router;
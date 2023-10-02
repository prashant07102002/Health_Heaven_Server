import express from 'express';
import { getNearbyGyms } from '../Controllers/nearbyGyms.js';

const Router = express.Router();

Router.get('/nearbyGyms', getNearbyGyms);

export default Router;
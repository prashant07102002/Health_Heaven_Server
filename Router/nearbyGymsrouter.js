import express from 'express';
import { findGyms, getNearbyGyms } from '../Controllers/nearbyGyms.js';

const Router = express.Router();

Router.get('/findGyms', findGyms);
Router.get('/nearbyGyms', getNearbyGyms);

export default Router;
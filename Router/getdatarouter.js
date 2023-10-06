import express from 'express';
import getdataController from '../Controllers/getdataController.js';
import requireUser from '../Middlewares/requireUser.js';
const Router = express.Router();
// import requireUser from '../Middelwares/requireUser';
Router.get('/userdata', requireUser, getdataController.userdataController);
export default Router;
import express from 'express';
import getdataController from '../Controllers/getdataController.js';
const Router = express.Router();
// import requireUser from '../Middelwares/requireUser';
Router.get('/userdata', getdataController.userdataController);
export default Router;
import express from 'express';
import {userdataController} from '../Controllers/getdataController.js';
import requireUser from '../Middlewares/requireUser.js';
import { setBodyInfo } from '../Controllers/setBodyInfoController.js';
const Router = express.Router();
// import requireUser from '../Middelwares/requireUser';
Router.get('/userdata/:_id', requireUser, userdataController);
Router.post('/bodyInfo/:_id', setBodyInfo);

export default Router;
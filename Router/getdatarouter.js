const router = require('express').Router();
const getdataController = require('../Controllers/getdataController');
const requireUser = require('../Middelwares/requireUser');
router.get('/userdata', getdataController.userdataController);
module.exports = router;
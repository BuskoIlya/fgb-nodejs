const Router = require('express');
const router = new Router();

const { playersController } = require('../components');

router.get('/', playersController.getAllPlayers);

module.exports = router;
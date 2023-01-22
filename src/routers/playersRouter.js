const Router = require('express');
const router = new Router();
const {PlayerController} = require('../db/controllers');

router.get('/', PlayerController.getAllPlayers);

module.exports = router;
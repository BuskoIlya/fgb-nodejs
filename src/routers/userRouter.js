const Router = require('express');
const router = new Router();

const UserController = require('../db/controllers/UserController');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
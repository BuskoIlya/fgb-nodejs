const Router = require('express');
const router = new Router();
const auth = require('../utils/auth');
const UserController = require('../db/controllers/UserController');

router.get('/', auth.checkToken, UserController.getMe);
router.patch(process.env.API_USER_UPDATE, auth.checkToken, UserController.update);
router.post(process.env.API_USER_LOGIN, UserController.login);
router.post(process.env.API_USER_REGISTER, UserController.register);

module.exports = router;
const Router = require('express');
const router = new Router();

const { authMiddleware } = require('../middleware');
const { userController } = require('../components');

router.get('/', authMiddleware, userController.getMe);
router.get(process.env.API_USER_LOGOUT, userController.logout);

router.patch(process.env.API_USER_UPDATE, authMiddleware, userController.update);

router.post(process.env.API_USER_LOGIN, userController.login);
router.post(process.env.API_USER_REGISTER, userController.register);

module.exports = router;
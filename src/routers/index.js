const Router = require('express');
const router = new Router();

const infoRouter = require('./infoRouter');
const playersRouter = require('./playersRouter');
const studyRouter = require('./studyRouter');
const tournamentsRouter = require('./tournamentsRouter');
const userRouter = require('./userRouter');

router.use(process.env.API_INFO, infoRouter);
router.use(process.env.API_PLAYERS, playersRouter);
router.use(process.env.API_STUDY, studyRouter);
router.use(process.env.API_TOURNAMENTS, tournamentsRouter);
router.use(process.env.API_USER, userRouter);


module.exports = router;
const Router = require('express');
const router = new Router();

const infoRouter = require('./infoRouter');
const playersRouter = require('./playersRouter');
const studyRouter = require('./studyRoute');
const tournamentsRouter = require('./tournamentsRouter');

router.use(process.env.API_INFO, infoRouter);
router.use(process.env.API_PLAYERS, playersRouter);
router.use(process.env.API_STUDY, studyRouter);
router.use(process.env.API_TOURNAMENTS, tournamentsRouter);

module.exports = router;
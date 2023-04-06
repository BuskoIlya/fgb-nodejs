const Router = require('express');
const router = new Router();

const {
  TournamentController
} = require('../db/controllers');

const {
  eucommandController,
  eucommandGroupsController,
  eupersonalController,
  nationalTeamGameController,
  wagcController
} = require('../components');

router.get('/', TournamentController.getAllTournaments);
router.get(process.env.API_TOURNAMENTS_EU_COMMAND, eucommandController.getAllEuCommandData);
router.get(process.env.API_TOURNAMENTS_EU_PERSONAL, eupersonalController.getAllEuPersonalData);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAMES,
  nationalTeamGameController.getAllGames
);
router.get(process.env.API_TOURNAMENTS_WORLD_CHAMPS, wagcController.getAllWAGCData);
router.get(process.env.API_TOURNAMENTS_BY_ID, TournamentController.getByTournamentById);
router.get(process.env.API_TOURNAMENTS_BY_YEAR, TournamentController.getTournamentsByYear);
router.get(
  process.env.API_TOURNAMENTS_EU_COMMAND_GROUPS_BY_YEAR,
  eucommandGroupsController.getAllGroupResultsByYear
);
router.get(
  process.env.API_TOURNAMENTS_EU_COMMAND_GROUPS_BY_YEAR_BY_GROUP,
  eucommandGroupsController.getDataByYearAndGroup
);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAME,
  nationalTeamGameController.getFullGameDataById
);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAMES_BY_YEAR,
  nationalTeamGameController.getGamesByYear
);
router.get(process.env.API_TOURNAMENTS_RU, TournamentController.getTournamentById);
router.get(process.env.API_TOURNAMENTS_WORLD, TournamentController.getTournamentById);

module.exports = router;
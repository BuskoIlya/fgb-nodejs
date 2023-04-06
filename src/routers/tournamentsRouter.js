const Router = require('express');
const router = new Router();

const {
  eucommandController,
  eucommandGroupsController,
  eupersonalController,
  nationalTeamGameController,
  tournamentController,
  wagcController
} = require('../components');

router.get('/', tournamentController.getAllTournaments);
router.get(process.env.API_TOURNAMENTS_EU_COMMAND, eucommandController.getAllEuCommandData);
router.get(process.env.API_TOURNAMENTS_EU_PERSONAL, eupersonalController.getAllEuPersonalData);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAMES,
  nationalTeamGameController.getAllGames
);
router.get(process.env.API_TOURNAMENTS_WORLD_CHAMPS, wagcController.getAllWAGCData);
router.get(process.env.API_TOURNAMENTS_BY_ID, tournamentController.getByTournamentById);
router.get(process.env.API_TOURNAMENTS_BY_YEAR, tournamentController.getTournamentsByYear);
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
router.get(process.env.API_TOURNAMENTS_RU, tournamentController.getTournamentById);
router.get(process.env.API_TOURNAMENTS_WORLD, tournamentController.getTournamentById);

module.exports = router;
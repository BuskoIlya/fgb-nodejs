const Router = require('express');
const router = new Router();

const {
  EUCommandController,
  EUCommandGroupsController,
  EUPersonalController,
  NationalTeamGameController,
  TournamentController,
  WAGCController
} = require('../db/controllers');

router.get('/', TournamentController.getAllTournaments);
router.get(process.env.API_TOURNAMENTS_EU_COMMAND, EUCommandController.getAllEUCommandData);
router.get(process.env.API_TOURNAMENTS_EU_PERSONAL, EUPersonalController.getAllEUPersonalData);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAMES,
  NationalTeamGameController.getAllNationalTeamGames
);
router.get(process.env.API_TOURNAMENTS_WORLD_CHAMPS, WAGCController.getAllWAGCData);
router.get(process.env.API_TOURNAMENTS_BY_ID, TournamentController.getByTournamentById);
router.get(process.env.API_TOURNAMENTS_BY_YEAR, TournamentController.getTournamentsByYear);
router.get(
  process.env.API_TOURNAMENTS_EU_COMMAND_GROUPS_BY_YEAR,
  EUCommandGroupsController.getAllGroupResultsByYear
);
router.get(
  process.env.API_TOURNAMENTS_EU_COMMAND_GROUPS_BY_YEAR_BY_GROUP,
  EUCommandGroupsController.getDataByYearAndGroup
);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAME,
  NationalTeamGameController.getFullTeamGameDataById
);
router.get(
  process.env.API_TOURNAMENTS_NATIONAL_TEAM_GAMES_BY_YEAR,
  NationalTeamGameController.getNationalTeamGamesByYear
);
router.get(process.env.API_TOURNAMENTS_RU, TournamentController.getTournamentById);
router.get(process.env.API_TOURNAMENTS_WORLD, TournamentController.getTournamentById);

module.exports = router;
module.exports = { getAllGames, getFullGameDataById, getGamesByYear };

const nationalTeamGameService = require('./nationalTeamGameService');

async function getAllGames(req, res, next) {
  try {
    const result = nationalTeamGameService.getAllGames();
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getFullGameDataById(req, res, next) {
  try {
    const result = await nationalTeamGameService.getFullGameDataById(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getGamesByYear(req, res, next) {
  try {
    const result = await nationalTeamGameService.getGamesByYear(req.params.year);
    res.json(result);
  } catch (e) {
    next(e);
  }
}
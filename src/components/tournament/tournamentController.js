module.exports = {
  getAllTournaments,
  getByTournamentById,
  getTournamentById,
  getTournamentsByYear
}

const tournamentService = require('./tournamentService');

async function getAllTournaments(req, res, next) {
  try {
    const result = await tournamentService.getAllTournaments();
    res.json(result);
  } catch (e) {
    next(e);
  }
}
async function getByTournamentById(req, res, next) {
  try {
    const result = await tournamentService.getByTournamentById(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getTournamentById(req, res, next) {
  try {
    const result = await tournamentService.getTournamentById(req.params.id, req.url);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getTournamentsByYear(req, res, next) {
  try {
    const result = await tournamentService.getTournamentsByYear(req.params.year);
    res.json(result);
  } catch (e) {
    next(e);
  }
}
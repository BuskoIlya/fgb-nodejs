module.exports = { getAllPlayers };

const { ApiError } = require('../../exceptions');
const playersModel = require('./playersModel');

async function getAllPlayers(req, res, next) {
  try {
    const result = await playersModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить данные об игроках'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
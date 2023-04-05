module.exports = { getAllRanks };

const { ApiError } = require('../../exceptions');
const ranksModel = require('./ranksModel');

async function getAllRanks(req, res, next) {
  try {
    const result = await ranksModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить список разрядов в Го'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
module.exports = { getAllEUCommandData };

const { ApiError } = require('../../exceptions');
const eucommandModel = require('./eucommandModel');

async function getAllEUCommandData(req, res, next) {
  try {
    const result = await eucommandModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить данные о командных чемпионатах европы'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
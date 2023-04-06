module.exports = { getAllEuCommandData };

const { ApiError } = require('../../exceptions');
const eucommandModel = require('./eucommandModel');

async function getAllEuCommandData(req, res, next) {
  try {
    const result = await eucommandModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Нет данных о командных чемпионатах европы'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
module.exports = { getAllEuPersonalData };

const { ApiError } = require('../../exceptions');
const eupersonalModel = require('./eupersonalModel');

async function getAllEuPersonalData(req, res, next) {
  try {
    const result = await eupersonalModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Нет данных о чемпионатах европы в персональном зачёте'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
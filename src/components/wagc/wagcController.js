module.exports = { getAllWAGCData };

const {ApiError} = require('../../exceptions');
const wagcModel = require('./wagcModel');

async function getAllWAGCData(req, res, next) {
  try {
    const result = await wagcModel.getAll();
    if (!result) {
      next(ApiError.BadRequest('Не удалось получить данные о чемпионатах мира'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
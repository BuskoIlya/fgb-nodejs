module.exports = { getAllStories, getStoryById };

const { ApiError } = require('../../exceptions');
const storiesModel = require('./storiesModel');

async function getAllStories(req, res, next) {
  try {
    const result = await storiesModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить данные об историях'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getStoryById(req, res, next) {
  try {
    const result = await storiesModel.getById(req.params.id);
    if (!result) {
      return next(ApiError.BadRequest('Не удалось найти историю'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
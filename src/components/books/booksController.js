module.exports = { getAllBooks, getBookById };

const { ApiError } = require('../../exceptions');
const booksModel = require('./booksModel');

async function getAllBooks(req, res, next) {
  try {
    const result = await booksModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить данные о книгах'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getBookById(req, res, next) {
  try {
    const result = await booksModel.getById(req.params.id);
    if (!result) {
      return next(ApiError.BadRequest('Не удалось найти книгу'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
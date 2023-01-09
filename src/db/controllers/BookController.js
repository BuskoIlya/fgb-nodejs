const Book = require('../models/Book');

const getAllBooks = async(req, res) => {
  Book.getAll(async(e, result) => {
    if (e) {
      console.error(`Не удалось получить данные о книгах: ${e}`);
      return res.status(404).json({
        error: 'Не удалось получить данные о книгах'
      });
    } else {
      res.json(result);
    }
  });
}

const getBookById = async (req, res) => {
  try {
    const result = await Book.getById(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить книгу ${req.params.id} года: ${e}`);
    return res.status(404).json({
      error: `Не удалось получить книгу`
    });
  }
}

module.exports.getAllBooks = getAllBooks;
module.exports.getBookById = getBookById;
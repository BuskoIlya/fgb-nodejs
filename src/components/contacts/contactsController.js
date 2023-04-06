module.exports = { getAllContacts };

const { ApiError } = require('../../exceptions');
const contactsModel = require('./contactsModel');

async function getAllContacts(req, res, next) {
  try {
    const result = await contactsModel.getAll();
    if (!result) {
      return next(ApiError.BadRequest('Не удалось получить данные о контактах'));
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}
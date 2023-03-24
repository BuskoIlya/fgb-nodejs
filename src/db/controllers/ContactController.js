const Contact = require('../models/Contact');

const getAllContacts = async(req, res) => {
  Contact.getAll(async(e, result) => {
    if (e) {
      console.error(`Не удалось получить данные о контактах: ${e}`);
      return res.status(404).json({
        message: 'Не удалось получить данные о контактах'
      });
    } else {
      res.json(result);
    }
  });
}

module.exports.getAllContacts = getAllContacts;
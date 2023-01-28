const User = require('../models/Users');

const login = async (req, res) => {
  try {
    const data = await User.login(req.body.login, req.body.password);
    res.json(data);
  } catch (e) {
    console.error(`Не удалось получить данные о пользователе: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о пользователе'
    });
  }
}

module.exports.login = login;
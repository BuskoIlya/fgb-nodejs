const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const register = async (req, res) => {
  try {
    const login = req.body.login;
    const user = await User.getUser(login);
    if (user) {
      console.error(`Ошибка 400. Не удалось зарегистрироваться: пользователь ${login} существует`);
      return res.status(400).json({
        error: 'Не удалось зарегистрироваться'
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    await User.register(login, hash);
    console.log(`Пользователь ${login} зарегистрирован`);

    const {passwordHash, ...userData} = await User.getUser(login);
    const token = jwt.sign({id: userData.id}, 'secret', {expiresIn: '30d'});
    res.json({...userData, token});
  } catch (e) {
    console.error(`Не удалось зарегистрироваться: ${e}`);
    return res.status(500).json({
      error: 'Не удалось зарегистрироваться'
    });
  }
}

const login = async (req, res) => {
  try {
    const login = req.body.login;
    const user = await User.getUser(login);
    if (!user) {
      console.error(`Ошибка 404. Пользователь ${login} не существует`);
      return res.status(400).json({
        error: 'Неверный логин или пароль'
      });
    }

    const password = req.body.password;
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      console.error(`Ошибка 401. Неверный пароль ${password} для пользователя ${login}`);
      return res.status(400).json({
        error: 'Неверный логин или пароль'
      });
    }

    console.log(`Пользователь ${login} авторизован`);
    const {passwordHash, ...userData} = user;
    const token = jwt.sign({id: userData.id}, 'secret', {expiresIn: '30d'});
    res.json({...userData, token});
  } catch (e) {
    console.error(`Не удалось авторизоваться: ${e}`);
    return res.status(500).json({
      error: 'Неверный логин или пароль'
    });
  }
}

module.exports.register = register;
module.exports.login = login;
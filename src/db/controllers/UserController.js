const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../../utils/auth');
const User = require('../models/User');
const util = require('../../utils/util');

const getMe = async (req, res) => {
  try {
    console.log(`req.id = ${req.id}`);
    const user = await User.getById(req.id);
    if (!user) {
      console.error(`Ошибка 404. Пользователь с id ${req.id} не найден`);
      return res.status(400).json({
        error: 'Пользователь не найден'
      });
    }

    console.log(`Пользователь с id ${req.id} найден`);
    const {passwordHash, ...userData} = user;
    res.json({
      fullName: util.fullName(user.family, user.name, user.father),
      ...userData
    });
  } catch (e) {
    console.error(`Ошибка 5xx: ${e}`);
    return res.status(500).json({
      error: 'Нет доступа'
    });
  }
}

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.getByEmail(email);
    if (!user) {
      console.error(`Ошибка 404. Пользователь ${email} не существует`);
      return res.status(400).json({
        error: 'Неверный логин или пароль'
      });
    }

    const password = req.body.password;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      console.error(`Ошибка 401. Неверный пароль ${password} для пользователя ${email}`);
      return res.status(400).json({
        error: 'Неверный логин или пароль'
      });
    }

    console.log(`Пользователь ${email} авторизован`);
    const token = jwt.sign({id: user.id}, process.env.AUTH_SECRET);
    res.cookie('token', token, auth.getCookieOptions());
    res.json({
      fullName: util.fullName(user.family, user.name, user.father),
      img: user.img,
      letter: user.name?.substr(0, 1),
      token
    });
  } catch (e) {
    console.error(`Не удалось авторизоваться: ${e}`);
    return res.status(500).json({
      error: 'Неверный логин или пароль'
    });
  }
}

const register = async (req, res) => {
  try {
    const email = req.body.email;
    let user = await User.getByEmail(email);
    if (user) {
      console.error(`Ошибка 400. Не удалось зарегистрироваться: пользователь ${email} существует`);
      return res.status(400).json({
        error: 'Не удалось зарегистрироваться'
      });
    }

    await User.register(email, await auth.getHash(req.body.password));
    console.log(`Пользователь ${email} зарегистрирован`);

    user = await User.getByEmail(email);
    const token = jwt.sign({id: user.id}, process.env.AUTH_SECRET);
    res.cookie('token', token, auth.getCookieOptions());
    console.log(res.cookies);
    res.json({token});
  } catch (e) {
    console.error(`Не удалось зарегистрироваться: ${e}`);
    return res.status(500).json({
      error: 'Не удалось зарегистрироваться'
    });
  }
}

const update = async (req, res) => {
  try {
    const newData = {
      id: req.id,
      login: req.body.login,
      passwordHash: auth.getHash(req.body.password),
      family: req.body.family,
      name: req.body.name,
      father: req.body.father,
      birthdate: req.body.birthdate,
      city: req.body.city,
      isPlayer: req.body.isPlayer
    }
    await User.update(newData);
    console.log(`Данные пользователя с id ${req.id} обновлены`);
    res.json({success: true});
  } catch (e) {
    console.error(`Ошибка 5xx. Не удалось обновить данные пользователя: ${e}`);
    return res.status(500).json({
      error: 'Не удалось обновить данные пользователя'
    });
  }
}

module.exports.getMe = getMe;
module.exports.login = login;
module.exports.register = register;
module.exports.update = update;
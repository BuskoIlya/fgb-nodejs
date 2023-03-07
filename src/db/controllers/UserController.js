module.exports.getMe = getMe;
module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;
module.exports.update = update;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../../utils/auth');
const User = require('../models/User');
const util = require('../../utils/util');

const GET_ME_ERROR = 'Данные пользователя не найдены';
async function getMe(req, res) {
  try {
    const user = await User.getById(req.id);
    if (!user) {
      console.error(`${GET_ME_ERROR} (${req.id})`);
      return res.status(404).json({ message: GET_ME_ERROR });
    }

    const { passwordHash, ...userData } = user;
    res.json({
      fullName: util.fullName(user.family, user.name, user.father),
      password: '',
      ...userData,
    });
  } catch (e) {
    console.error(`(${req.id}): ${e}`);
    return res.status(500).json({ message: GET_ME_ERROR });
  }
}

const LOGIN_ERROR = 'Неверный логин или пароль';
async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.getByEmail(email);
    if (!user) {
      console.error(`${LOGIN_ERROR}: ${email} не существует`);
      return res.status(404).json({ message: LOGIN_ERROR });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      console.error(`${LOGIN_ERROR}: ${email} / ${password}`);
      return res.status(401).json({ message: LOGIN_ERROR });
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET);
    res.cookie('token', token, auth.getCookieLoginOptions());
    res.json({
      fullName: util.fullName(user.family, user.name, user.father),
      img: user.img,
      letter: user.name?.substr(0, 1),
      token
    });
  } catch (e) {
    console.error(`Ошибка ${email} / ${password}: ${e}`);
    return res.status(500).json({ message: LOGIN_ERROR });
  }
}

const LOGOUT_ERROR = 'Не удалось выйти. Напишите в техподдержку';
async function logout(req, res) {
  try {
    res.cookie('token', '', auth.getCookieLogoutOptions());
    res.send();
  } catch (e) {
    console.error(`${LOGOUT_ERROR}: ${e}`);
    return res.status(500).json({ message: LOGOUT_ERROR });
  }
}

const REGISTER_ERROR = 'Зарегистрироваться не удалось';
async function register(req, res) {
  const email = req.body.email;
  try {
    let user = await User.getByEmail(email);
    if (user) {
      console.error(`${REGISTER_ERROR}: ${email} существует`);
      return res.status(400).json({ message: REGISTER_ERROR });
    }

    await User.register(email, await auth.getHash(req.body.password));

    user = await User.getByEmail(email);
    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET);
    res.cookie('token', token, auth.getCookieLoginOptions());
    res.json({token});
  } catch (e) {
    console.error(`${REGISTER_ERROR} (${email}): ${e}`);
    return res.status(500).json({ message: REGISTER_ERROR });
  }
}

const UPDATE_SUCCESS = 'Данные успешно обновлены';
const UPDATE_ERROR = 'Не удалось обновить данные';
async function update(req, res) {
  try {
    let newData = '';
    for (let key in req.body) {
      if (newData) {
        newData += ', ';
      }
      newData += `${key}='${req.body[key]}'`;
    }
    await User.update(newData, req.id);
    res.json({ message: UPDATE_SUCCESS });
  } catch (e) {
    console.error(`${UPDATE_ERROR} (${req.id}): ${e}`);
    return res.status(500).json({ message: UPDATE_ERROR });
  }
}
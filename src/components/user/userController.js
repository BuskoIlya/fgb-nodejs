module.exports = { getMe, login, logout, register, update };

const { tokenService } = require('../../services');
const userService = require('./userService');

async function getMe(req, res, next) {
  try {
    const userDto = await userService.getMe(req.id);
    res.json(userDto);
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { token, userDto } = await userService.login(req.body.email, req.body.password)
    res.cookie('token', token, tokenService.getCookieLoginOptions());
    res.json({ token, ...userDto });
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  try {
    res.cookie('token', '', tokenService.getCookieLogoutOptions());
    res.send();
  } catch (e) {
    next(e);
  }
}

async function register(req, res, next) {
  try {
    const { token, userDto } = await userService.register(req.body.email, req.body.password);
    res.cookie('token', token, tokenService.getCookieLoginOptions());
    res.json({ token, ...userDto });
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let newData = '';
    for (let key in req.body) {
      if (newData) {
        newData += ', ';
      }
      newData += `${key}='${req.body[key]}'`;
    }
    await userService.update(newData, req.id);
    res.json({ message: 'Данные успешно обновлены' });
  } catch (e) {
    next(e);
  }
}
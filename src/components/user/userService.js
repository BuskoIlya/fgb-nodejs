module.exports = { getMe, login, register, update };

const bcrypt = require('bcrypt');

const { ApiError } = require('../../exceptions');
const { UserDTO } = require('./UserDTO');
const userModel = require('./userModel');
const { tokenService } = require('../../services');

async function getMe(id) {
  const user = await userModel.getById(id);
  if (!user) {
    throw ApiError.BadRequest('Данные пользователя не найдены');
  }
  const userDto = new UserDTO(user);
  return userDto;
}

async function login(email, password) {
  const user = await userModel.getByEmail(email);
  if (!user) {
    throw ApiError.BadRequest(`Пользователь с почтой ${email} не найден`);
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw ApiError.BadRequest('Неверный логин или пароль');
  }
  const token = tokenService.generateToken({ id: user.id });
  const userDto = new UserDTO(user);
  return { token, userDto };
}

async function register(email, password) {
  const candidate = await userModel.getByEmail(email);
  if (candidate) {
    throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`);
  }

  const hasPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create(email, hasPassword);
  const token = tokenService.generateToken({ id: user.id });
  const userDto = new UserDTO(user);
  return { token, userDto };
}

async function update(newData, userId) {
  await userModel.update(newData, userId);
}
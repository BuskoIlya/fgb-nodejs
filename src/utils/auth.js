const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.error(`Ошибка 403. Нет токена: ${token}`);
    return res.status(403).json({error: 'Нет доступа'});
  }
  try {
    const { id } = jwt.verify(token, process.env.AUTH_SECRET);
    req.id = id;
    next();
  } catch (e) {
    console.error(`Ошибка проверки токена ${token}: ${e}`);
    return res.status(403).json({error: 'Нет доступа'});
  }
}

const getCookieLoginOptions = () => {
  return {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
    sameSite: 'Strict',
  };
}

const getCookieLogoutOptions = () => {
  return {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'Strict',
  };
}

const getHash = async (data) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data, salt);
  return hash;
}

module.exports.checkToken = checkToken;
module.exports.getCookieLoginOptions = getCookieLoginOptions;
module.exports.getCookieLogoutOptions = getCookieLogoutOptions;
module.exports.getHash = getHash;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.error(`Ошибка 403. Нет токена: ${token}`);
    return res.status(403).json({error: 'Нет доступа'});
  }
  try {
    const {id} = jwt.verify(token, process.env.AUTH_SECRET);
    req.id = id;
    next();
  } catch (e) {
    console.error(`Ошибка проверки токена ${token}: ${e}`);
    return res.status(403).json({error: 'Нет доступа'});
  }
}

const getCookieOptions = () => {
  return {
    httpOnly: false,
    maxAge: 1000000,
    path: '/',
    sameSite: 'none',
  };
}

const getHash = async (data) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data, salt);
  return hash;
}

module.exports.checkToken = checkToken;
module.exports.getCookieOptions = getCookieOptions;
module.exports.getHash = getHash;
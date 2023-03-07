module.exports.checkToken = checkToken;
module.exports.getCookieLoginOptions = getCookieLoginOptions;
module.exports.getCookieLogoutOptions = getCookieLogoutOptions;
module.exports.getHash = getHash;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CHECK_TOKEN_ERROR = 'Нет доступа';
function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.error(`Нет токена: ${token}`);
    return res.status(403).json({ message: CHECK_TOKEN_ERROR });
  }
  try {
    req.id = jwt.verify(token, process.env.AUTH_SECRET).id;
    next();
  } catch (e) {
    console.error(`${CHECK_TOKEN_ERROR} ${token}: ${e}`);
    return res.status(403).json({ message: CHECK_TOKEN_ERROR });
  }
}

function getCookieLoginOptions() {
  return {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
    sameSite: 'Strict',
  };
}

function getCookieLogoutOptions() {
  return {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'Strict',
  };
}

async function getHash(data) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data, salt);
  return hash;
}
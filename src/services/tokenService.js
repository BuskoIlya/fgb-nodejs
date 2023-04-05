module.exports.generateToken = generateToken;
module.exports.getCookieLoginOptions = getCookieLoginOptions;
module.exports.getCookieLogoutOptions = getCookieLogoutOptions;
module.exports.validateToken = validateToken;

const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const accessToken = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '15m' });
  return accessToken;
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

function validateToken(token) {
  try {
    const userId = jwt.verify(token, process.env.AUTH_SECRET).id;
    return userId;
  } catch (e) {
    return null;
  }
}
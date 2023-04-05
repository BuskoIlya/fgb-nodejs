const { ApiError } = require('../exceptions');
const { tokenService } = require('../services');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    const userId = tokenService.validateToken(token);
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    req.id = userId;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
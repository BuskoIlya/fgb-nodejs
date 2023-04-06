module.exports = { getAllNews };

const newsService = require('./newsService');

async function getAllNews(req, res, next) {
  try {
    const result = await newsService.getAllNews();
    res.json(result);
  } catch (e) {
    next(e);
  }
}
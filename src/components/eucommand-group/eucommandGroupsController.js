module.exports = { getAllGroupResultsByYear, getDataByYearAndGroup };

const eucommandGroupsService = require('./eucommandGroupsService');

async function getAllGroupResultsByYear(req, res, next) {
  try {
    const result = await eucommandGroupsService
      .getAllGroupResultsByYear(req.params.year.toString());
    return res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getDataByYearAndGroup(req, res, next) {
  try {
    const result = await eucommandGroupsService
      .getDataByYearAndGroup(req.params.year.toString(), req.params.group.toString());
    return res.json(result);
  } catch (e) {
    next(e);
  }
}
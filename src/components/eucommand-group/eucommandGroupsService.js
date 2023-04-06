module.exports = { getAllGroupResultsByYear, getDataByYearAndGroup };

const { ApiError } = require('../../exceptions');
const eucommandGroups = require('./eucommandGroupsModel');
const eucommandGames = require('./eucommandGamesModel');

async function getAllGroupResultsByYear(year) {
  const result = await Promise.all(
    ['A', 'B', 'C', 'D'].map(async (x) => {
      const groupResult =
        await eucommandGroups.getGroupResultsByYear(year, x);
      if (!groupResult) {
        throw ApiError.BadRequest('Данные по группе ${x} не найдены');
      }
      return { group: x, data: groupResult };
    })
  );
  return result;
}

async function getDataByYearAndGroup(year, group) {
  const table = await eucommandGroups.getGroupResultsByYear(year, group);
  if (!table) {
    throw ApiError.BadRequest('Данные по группе ${group} не найдены');
  }
  const roundsAndDates = await eucommandGames.getRoundsAndDates(year, group);
  if (!table) {
    throw ApiError.BadRequest('Данные по группе ${group} не найдены');
  }
  const rounds = await Promise.all(roundsAndDates.map(async (x) => {
    const games = await eucommandGames.getRoundGames(year, group, x.number);
    if (!games) {
      throw ApiError.BadRequest('Данные по группе ${group} не найдены');
    }
    return {
      name: 'Тур ' + x.number,
      date: x.date,
      games
    };
  }));
  return { table, rounds };
}
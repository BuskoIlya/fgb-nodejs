const EUCommandGroups = require('../models/EUCommandGroups');
const EUCommandGames = require('../models/EUCommandGames');

const getAllGroupResultsByYear = async (req, res) => {
  try {
    const result = await Promise.all(
      ['A', 'B', 'C', 'D'].map(async (item) => {
        const groupResult =
          await EUCommandGroups.getGroupResultsByYearAndGroup(req.params.year.toString(), item);
        return {group: item, data: groupResult};
      })
    );
    return res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данных о результатах сборных на групповом этапе ${req.params.year}: ${e}`);
    res.status(404).json({
      error: `Не удалось получить данных о результатах сборных на групповом этапе ${req.params.year}`
    })
  }
}

const getDataByYearAndGroup = async (req, res) => {
  try {
    const year = req.params.year.toString();
    const group = req.params.group.toString();
    const table = await EUCommandGroups.getGroupResultsByYearAndGroup(year, group);
    const roundsAndDates = await EUCommandGames.getRoundsAndDates(year, group);
    const rounds = await Promise.all(roundsAndDates.map(async (item) => {
      const games = await EUCommandGames.getRoundGames(year, group, item.number);
      return {
        name: 'Тур ' + item.number,
        date: item.date,
        games
      };
    }));
    return res.json({table, rounds});
  } catch (e) {
    console.error(`Не удалось получить данных о группе ${req.params.group} в сезоне ${req.params.year}: ${e}`);
    res.status(404).json({
      error: `Не удалось получить данных о группе ${req.params.group} в сезоне ${req.params.year}`
    })
  }
}

module.exports.getAllGroupResultsByYear = getAllGroupResultsByYear;
module.exports.getDataByYearAndGroup = getDataByYearAndGroup;
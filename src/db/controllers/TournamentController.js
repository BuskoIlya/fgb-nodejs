const Tournament = require('../models/Tournament');
const Country = require('../models/Country');

const getAllTournaments = async (req, res) => {
  try {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const result = await Promise.all(
      years.map(async (year) => {
        const items = await Tournament.getAllByYear(year);
        return {year, items};
    }));
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данные о турнирах: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о турнирах'
    });
  }
}

const getTournamentsByYear = async (req, res) => {
  try {
    const result = await Tournament.getAllByYear(req.params.year);
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить турниры ${req.params.year} года: ${e}`);
    return res.status(404).json({
      error: `Не удалось получить турниры ${req.params.year} года`
    });
  }
}

const getByTournamentById = async (req, res) => {
  try {
    const tournamentInfo = await Tournament.getInfoById(req.params.id);
    const tablesInfo = await Tournament.getTablesInfoById(req.params.id);
    const tables = await Promise.all(
      tablesInfo.map(
        async (item) => {
          const result = await Tournament.getByResultsByName(item.name);
          return {info: item, items: result};
        }
      )
    );
    res.json({...tournamentInfo, tables});
  } catch (e) {
    console.error(`Не удалось получить данные о турнире: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о турнире'
    });
  }
}

const getTournamentById = async (req, res) => {
  try {
    console.log(req);
    const tournamentInfo = await Tournament.getInfoById(req.params.id);
    const tablesInfo = await Tournament.getTablesInfoById(req.params.id);
    const tables = await Promise.all(
      tablesInfo.map(
        async (item) => {
          const result = await Tournament.getResultsByName(item.name);
          if (req.url.includes('world')) {
            const countries = await Country.getAll();
            result.forEach(item => {
              const country = countries.find(c => c.id === item.country);
              item.country = country;
            });
          }
          return {info: item, items: result};
        }
      )
    );
    res.json({...tournamentInfo, tables});
  } catch (e) {
    console.error(`Не удалось получить данные о турнире: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о турнире'
    });
  }
}

module.exports.getByTournamentById = getByTournamentById;
module.exports.getTournamentById = getTournamentById;
module.exports.getAllTournaments = getAllTournaments;
module.exports.getTournamentsByYear = getTournamentsByYear;
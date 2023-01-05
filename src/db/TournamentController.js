const Tournament = require('./Tournament');
const Country = require('./Country');

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
    return res.status(404).json({
      error: `Не удалось получить данные о турнирах`
    });
  }
}

const getTournamentsByYear = async (req, res) => {
  try {
    const result = await Tournament.getAllByYear(req.params.id);
    res.json(result);
  } catch (e) {
    return res.status(404).json({
      error: `Не удалось получить турниры ${req.params.id} года`
    });
  }
}

const getTournamentById = async (req, res) => {
  try {
    const tournamentInfo = await Tournament.getInfoById(req.params.id);
    const tablesInfo = await Tournament.getTablesInfoById(req.params.id);
    const tables = await Promise.all(
      tablesInfo.map(
        async (item) => {
          const result = await Tournament.getResultTableByName(item.name);
          return {info: item, items: result};
        }
      )
    );
    res.json({...tournamentInfo, tables});
  } catch (e) {
    return res.status(404).json({
      error: 'Не удалось получить данные о турнире'
    });
  }
}

const getTournamentRuById = async (req, res) => {
  try {
    const tournamentInfo = await Tournament.getInfoById(req.params.id);
    const tablesInfo = await Tournament.getTablesInfoById(req.params.id);
    const tables = await Promise.all(
      tablesInfo.map(
        async (item) => {
          const result = await Tournament.getResultTableRuByName(item.name);
          return {info: item, items: result};
        }
      )
    );
    res.json({...tournamentInfo, tables});
  } catch (e) {
    return res.status(404).json({
      error: 'Не удалось получить данные о турнире'
    });
  }
}

const getTournamentWorldById = async (req, res) => {
  try {
    const tournamentInfo = await Tournament.getInfoById(req.params.id);
    const tablesInfo = await Tournament.getTablesInfoById(req.params.id);
    const tables = await Promise.all(
      tablesInfo.map(
        async (item) => {
          const result = await Tournament.getResultTableWorldByName(item.name);
          const countries = await Country.getAll();
          result.forEach(item => {
            const country = countries.find(c => c.id === item.country);
            item.country = country;
          });
          return {info: item, items: result};
        }
      )
    );
    res.json({...tournamentInfo, tables});
  } catch (e) {
    return res.status(404).json({
      error: 'Не удалось получить данные о турнире'
    });
  }
}

module.exports.getTournamentById = getTournamentById;
module.exports.getTournamentRuById = getTournamentRuById;
module.exports.getTournamentWorldById = getTournamentWorldById;
module.exports.getAllTournaments = getAllTournaments;
module.exports.getTournamentsByYear = getTournamentsByYear;
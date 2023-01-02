const Tournament = require('./Tournament');

const getAllTournaments = async (req, res) => {
  Tournament.getAll(async(e, result) => {
    if (e) {
      return res.status(404).json({
        error: 'Не удалось получить данные о турнирах'
      });
    } else {
      res.json(result);
    }
  });
}

const getTournamentsByYear = async (req, res) => {
  try {
    console.log(2022);
    const result = await Tournament.getAllByYear(req.params.id);
    console.log(result);
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

module.exports.getAllTournaments = getAllTournaments;
module.exports.getTournamentById = getTournamentById;
module.exports.getTournamentsByYear = getTournamentsByYear;
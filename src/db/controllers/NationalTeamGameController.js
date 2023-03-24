const NationalTeamGame = require('../models/NationalTeamGame');
const NationalPlayerGame = require('../models/NationalPlayerGame');

const getFullTeamGameDataById = async (req, res) => {
  try {
    const gameData = await NationalTeamGame.getFullDataById(req.params.id);
    const playerGames = await NationalPlayerGame.getPlayersByTeamGameId(req.params.id);
    const team1Players =
      await NationalPlayerGame.getPlayersInTeamGameByTeamId(req.params.id, gameData.team1_id);
    const team2Players =
      await NationalPlayerGame.getPlayersInTeamGameByTeamId(req.params.id, gameData.team2_id);
    res.json({...gameData, playerGames, team1Players, team2Players});
  } catch (e) {
    console.error(`Не удалось получить данные о б игре сборных ${req.params.id}: ${e}`);
    res.status(404).json({
      message: `Не удалось получить данные о б игре сборных`
    })
  }
}

const getNationalTeamGamesByYear = async (req, res) => {
  try {
    const result = await NationalTeamGame.getAllByYear(req.params.year);
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить игры сборных ${req.params.year} года: ${e}`);
    return res.status(404).json({
      message: `Не удалось получить игры сборных ${req.params.year} года`
    });
  }
}

const getAllNationalTeamGames = async (req, res) => {
  try {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const result = await Promise.all(
      years.map(async (year) => {
        const items = await NationalTeamGame.getAllByYear(year);
        return {year, items};
      }));
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить игры сборных: ${e}`);
    return res.status(404).json({
      message: 'Не удалось получить игры сборных'
    });
  }
}

module.exports.getFullTeamGameDataById = getFullTeamGameDataById;
module.exports.getNationalTeamGamesByYear = getNationalTeamGamesByYear;
module.exports.getAllNationalTeamGames = getAllNationalTeamGames;
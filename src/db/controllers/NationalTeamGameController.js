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
      error: `Не удалось получить данные о б игре сборных`
    })
  }
}

module.exports.getFullTeamGameDataById = getFullTeamGameDataById;
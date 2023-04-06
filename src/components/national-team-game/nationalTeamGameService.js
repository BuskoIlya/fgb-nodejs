module.exports = { getAllGames, getFullGameDataById, getGamesByYear };

const { ApiError } = require('../../exceptions');
const nationalTeamGameModel = require('./nationalTeamGameModel');
const nationalPlayerGameModel = require('./nationalPlayerGameModel');

async function getAllGames() {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const result = await Promise.all(
    years.map(async (x) => {
      const games = await nationalTeamGameModel.getAllByYear(x);
      if (!games) {
        throw ApiError.BadRequest('Не удалось получить игры сборных');
      }
      return { year: x, items: games };
    }));
  return result;
}

async function getFullGameDataById(id) {
  const error = ApiError.BadRequest('Не удалось получить данные об игре сборных');

  const gameData = await nationalTeamGameModel.getFullDataById(id);
  if (!gameData) {
    throw error;
  }

  const playerGames = await nationalPlayerGameModel.getPlayersByGameId(id);
  if (!playerGames) {
    throw error;
  }

  const team1Players =
    await nationalPlayerGameModel.getPlayersInGameByTeamId(id, gameData.team1_id);
  if (!team1Players) {
    throw error;
  }
  const team2Players =
    await nationalPlayerGameModel.getPlayersInGameByTeamId(id, gameData.team2_id);
  if (!team2Players) {
    throw error;
  }

  return { ...gameData, playerGames, team1Players, team2Players };
}

async function getGamesByYear(year) {
  const result = await nationalTeamGameModel.getAllByYear(year);
  if (!result) {
    throw ApiError.BadRequest('Не удалось получить игры сборных');
  }
  return result;
}
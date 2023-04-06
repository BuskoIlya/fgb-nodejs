module.exports = { getAllNews };

const { ApiError } = require('../../exceptions');
const { objectService } = require('../../services');
const { nationalTeamGameModel } = require('../national-team-game');
const { tournamentModel } = require('../tournament');

async function getAllNews() {
  const error = ApiError.BadRequest('Не удалось получить данные об игре сборных');
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const result = await Promise.all(
    years.map(async (year) => {
      const games = await nationalTeamGameModel.getAllByYear(year);
      if (!games) {
        throw error;
      }
      games.forEach(x => {
        x.ref = `/national-team-game/${x.id}`;
        x.color = 'blue';
      });
      const tournaments = await tournamentModel.getAllByYear(year);
      if (!tournaments) {
        throw error;
      }
      tournaments.forEach(x => {
        x.ref = x.toref ? `/tournament/${x.toref}` : `/tournament/${x.id}`;
      });
      const items = [...games, ...tournaments];
      items.sort(objectService.decreaseByStrField('order_field'));
      return { year, items };
    }));
  return result;
}
const util = require('../../util');
const NationalTeamGame = require('../../components/national-team-game/nationalTeamGameModel');
const Tournament = require('../models/Tournament');

const getAllNews = async (req, res) => {
  try {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const result = await Promise.all(
      years.map(async (year) => {
        const nationalTeamGames = await NationalTeamGame.getAllByYear(year);
        nationalTeamGames.forEach(item => {
          item.ref = `/national-team-game/${item.id}`;
          item.color = 'blue';
        });
        const tournaments = await Tournament.getAllByYear(year);
        tournaments.forEach(item => {
          item.ref = item.toref ? `/tournament/${item.toref}` : `/tournament/${item.id}`;
        });
        const items = [...nationalTeamGames, ...tournaments];
        items.sort(util.decreaseByStrField('order_field'));
        return {year, items};
      }));
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данные о событиях: ${e}`);
    return res.status(404).json({
      message: 'Не удалось получить данные о событиях'
    });
  }
}

module.exports.getAllNews = getAllNews;
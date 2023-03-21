const Player = require('../models/Player');

const getAllPlayers = async(req, res) => {
  Player.getAll(async(e, result) => {
    if (e) {
      console.error(`Не удалось получить данные об игроках: ${e}`);
      return res.status(404).json({
        message: 'Не удалось получить данные об игроках'
      });
    } else {
      res.json(result);
    }
  });
}

module.exports.getAllPlayers = getAllPlayers;
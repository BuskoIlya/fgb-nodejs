const Player = require('./Player');

const getAllPlayers = async(req, res) => {
  Player.getAll(async(e, result) => {
    if (e) {
      return res.status(404).json({
        error: 'Не удалось получить данные об игроках'
      });
    } else {
      res.json(result);
    }
  });
}

module.exports.getAllPlayers = getAllPlayers;
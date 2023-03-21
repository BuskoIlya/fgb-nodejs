const Rank = require('../models/Rank');

const getAllRanks = async(req, res) => {
  Rank.getAll(async(e, result) => {
    if (e) {
      console.error(`Не удалось получить данные о разрядах: ${e}`);
      return res.status(404).json({
        message: 'Не удалось получить данные о разрядах'
      });
    } else {
      res.json(result);
    }
  });
}

module.exports.getAllRanks = getAllRanks;
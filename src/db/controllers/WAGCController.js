const WAGC = require('../models/WAGC');

const getAllWAGCData = async (req, res) => {
  try {
    const result = await WAGC.getAll();
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данные о чемпионатах мира: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о чемпионатах мира'
    });
  }
}

module.exports.getAllWAGCData = getAllWAGCData;
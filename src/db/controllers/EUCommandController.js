const EUCommand = require('../models/EUCommand');

const getAllEUCommandData = async (req, res) => {
  try {
    const result = await EUCommand.getAll();
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данные о командных чемпионатах европы: ${e}`);
    return res.status(404).json({
      error: 'Не удалось получить данные о командных чемпионатах европы'
    });
  }
}

module.exports.getAllEUCommandData = getAllEUCommandData;
const EUPersonal = require('../models/EUPersonal');

const getAllEUPersonalData = async (req, res) => {
  try {
    const result = await EUPersonal.getAll();
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данные о чемпионатах европы в персональном зачёте: ${e}`);
    return res.status(404).json({
      message: 'Не удалось получить данные о чемпионатах европы в персональном зачёте'
    });
  }
}

module.exports.getAllEUPersonalData = getAllEUPersonalData;
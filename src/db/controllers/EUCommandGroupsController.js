const EUCommandGroups = require('../models/EUCommandGroups');

const getAllGroupResultsByYear = async (req, res) => {
  try {
    const result = await Promise.all(
      ['A', 'B', 'C', 'D'].map(async (item) => {
        const groupResult =
          await EUCommandGroups.getGroupResultsByYearAndGroup(req.params.year.toString(), item);
        return {group: item, data: groupResult};
      })
    );
    return res.json(result);
  } catch (e) {
    console.error(`Не удалось получить данных о результатах сборных на групповом этапе ${req.params.year}: ${e}`);
    res.status(404).json({
      error: `Не удалось получить данных о результатах сборных на групповом этапе ${req.params.year}`
    })
  }
}

const getDataByYearAndGroup = async (req, res) => {
  try {
    const result = await EUCommandGroups.getGroupResultsByYearAndGroup(
      req.params.year.toString(),
      req.params.group.toString());
    return res.json({table: result});
  } catch (e) {
    console.error(`Не удалось получить данных о группе ${req.params.group} в сезоне ${req.params.year}: ${e}`);
    res.status(404).json({
      error: `Не удалось получить данных о группе ${req.params.group} в сезоне ${req.params.year}`
    })
  }
}

module.exports.getAllGroupResultsByYear = getAllGroupResultsByYear;
module.exports.getDataByYearAndGroup = getDataByYearAndGroup;
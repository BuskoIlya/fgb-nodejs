const Story = require('../models/Story');

const getAllStories = async(req, res) => {
  Story.getAll(async(e, result) => {
    if (e) {
      console.error(`Не удалось получить данные об историях: ${e}`);
      return res.status(404).json({
        error: 'Не удалось получить данные об историях'
      });
    } else {
      res.json(result);
    }
  });
}

const getStoryById = async (req, res) => {
  try {
    const result = await Story.getById(req.params.id);
    res.json(result);
  } catch (e) {
    console.error(`Не удалось получить историю ${req.params.id}: ${e}`);
    return res.status(404).json({
      error: `Не удалось получить историю`
    });
  }
}

module.exports.getAllStories = getAllStories;
module.exports.getStoryById = getStoryById;
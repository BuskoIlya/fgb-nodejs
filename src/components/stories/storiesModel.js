module.exports = { getAll, getById };

const query = require('../../db/query');

const TABLE = process.env.DB_TN_STORY;
const SQL_GET_ALL_STORIES = `select * from ${TABLE} order by id asc`;
const SQL_GET_STORY_BY_ID = `select * from ${TABLE} where id=?`;


async function getAll() {
  return query.execute(SQL_GET_ALL_STORIES);
}

async function getById(id) {
  return (await query.execute(SQL_GET_STORY_BY_ID, [id]))[0];
}
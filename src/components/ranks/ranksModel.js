module.exports = { getAll };

const query = require('../../db/query');

const TABLE = process.env.DB_TN_RANKS;
const SQL_GET_ALL_RANKS = `
select concat(min, ' - ', max) as scores, 
sport_rank as sportRank from ${TABLE} order by id desc`;

async function getAll() {
  return query.execute(SQL_GET_ALL_RANKS);
}
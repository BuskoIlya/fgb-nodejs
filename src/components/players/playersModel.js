module.exports = { getAll };

const query = require('../../db/query');

const TABLE = process.env.DB_TN_PLAYERS;
const SQL_GET_ALL_PLAYERS = `
select concat(family, " ", name, " ", ifnull(father, "")) as fullName, 
city, sport_rank as sportRank, score from ${TABLE} order by score desc`;

async function getAll() {
  return query.execute(SQL_GET_ALL_PLAYERS);
}
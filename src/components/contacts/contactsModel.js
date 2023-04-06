module.exports = { getAll };

const query = require('../../db/query');

const PLAYERS_TABLE = process.env.DB_TN_PLAYERS;
const TABLE = process.env.DB_TN_CONTACTS;
const SQL_GET_ALL_CONTACTS = `
select concat(p.family, ' ', p.name, ' ', ifnull(p.father, '')) as fullName, 
p.sport_rank as sportRank, c.img, c.description, c.phone, c.email 
from ${TABLE} as c inner join ${PLAYERS_TABLE} as p on c.player_id=p.id 
order by c.id asc`;

async function getAll() {
  return query.execute(SQL_GET_ALL_CONTACTS);
}
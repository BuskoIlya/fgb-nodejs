module.exports = { getAll };

const { query } = require('../../db');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE = process.env.DB_TN_EU_PERSONAL;
const SQL_GET_ALL = `
select e.year, c.name as country, c.flag_img as flag, e.city, 
c1.name as country1, c1.flag_img as flag1, e.g_name as name1 
from ${TABLE} as e 
inner join ${COUNTRIES_TABLE} as c on e.country_id=c.id 
inner join ${COUNTRIES_TABLE} as c1 on e.g_country=c1.id 
order by year desc`;

async function getAll() {
  return query.execute(SQL_GET_ALL);
}
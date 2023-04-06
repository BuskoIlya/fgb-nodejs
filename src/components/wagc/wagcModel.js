module.exports = { getAll };

const { query } = require('../../db');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE = process.env.DB_TN_WAGC;
const SQL_GET_ALL = `
select w.year, c.name as country, c.flag_img as flag, 
w.city as city, 
w.g_name as name1, c1.name as country1, c1.flag_img as flag1, 
w.s_name as name2, c2.name as country2, c2.flag_img as flag2, 
w.b_name as name3, c3.name as country3, c3.flag_img as flag3 
from ${TABLE} as w 
inner join ${COUNTRIES_TABLE} as c on w.country_id=c.id 
inner join ${COUNTRIES_TABLE} as c1 on w.g_country=c1.id 
inner join ${COUNTRIES_TABLE} as c2 on w.s_country=c2.id 
inner join ${COUNTRIES_TABLE} as c3 on w.b_country=c3.id 
order by year desc`;


async function getAll() {
  return query.execute(SQL_GET_ALL);
}
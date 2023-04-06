module.exports = { getGroupResultsByYear };

const { query } = require('../../db');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE = process.env.DB_TN_EU_COMMAND_GROUPS;
const SQL_GET_GROUP_RESULTS_BY_YEAR = `
select e.*, c.name as country, c.flag_img as flag_country 
from ${TABLE} as e 
inner join ${COUNTRIES_TABLE} as c on c.id=e.country_id 
where year=? and eu_cmd_group=? 
order by score desc`;

async function getGroupResultsByYear(year, group) {
  return query.execute(SQL_GET_GROUP_RESULTS_BY_YEAR, [year, group]);
}
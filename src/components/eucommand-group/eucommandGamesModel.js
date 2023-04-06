module.exports = { getRoundsCount, getRoundsAndDates, getRoundGames };

const { query } = require('../../db');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE = process.env.DB_TN_EU_COMMAND_GAMES;
const SQL_SET_RU_TIME = 'set lc_time_names = "ru_RU"';
const SQL_GET_ROUNDS_COUNT = `
select count(distinct round_number) as round_count from ${TABLE} 
where year=? and group_name=?
`;
const SQL_GET_ROUNDS_AND_DATES = `
select distinct round_number as number, date_format(round_date, "%d %M %Y") as date 
from ${TABLE} 
where year=? and group_name=? order by round_number asc
`;
const SQL_GET_ROUND_GAMES = `
select e.result, 
c1.name as cmd_1, c1.flag_img as cmd_1_flag, 
c2.name as cmd_2, c2.flag_img as cmd_2_flag 
from ${TABLE} as e 
inner join ${COUNTRIES_TABLE} as c1 on c1.id=e.cmd1_id 
inner join ${COUNTRIES_TABLE} as c2 on c2.id=e.cmd2_id 
where e.year=? and e.group_name=? and e.round_number=? 
order by e.id asc
`;

async function getRoundsCount(year, group) {
  return (await query.execute(SQL_GET_ROUNDS_COUNT, [year, group]))[0].round_count;
}

async function getRoundsAndDates(year, group) {
  const sql = SQL_SET_RU_TIME + ';' + SQL_GET_ROUNDS_AND_DATES;
  return (await query.execute(sql, [year, group]))[1];
}

async function getRoundGames(year, group, roundNumber) {
  return query.execute(SQL_GET_ROUND_GAMES, [year, group, roundNumber]);
}
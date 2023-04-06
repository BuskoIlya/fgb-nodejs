module.exports = {
  getAllByYear,
  getInfoById,
  getTablesInfoById,
  getByResultsByName,
  getResultsByName
};

const { query } = require('../../db');

const PLAYERS_TABLE = process.env.DB_TN_PLAYERS;
const ADDRESS_TABLE = process.env.DB_TN_ADDRESSES;
const TABLE = process.env.DB_TN_TOURNAMENTS;
const TOURNAMENT_TABLES = process.env.DB_TN_TOURNAMENT_TABLES;
const TEMPORARY_TABLE = process.env.DB_TN_TEMPORARY;

const SQL_GET_ALL = `select * from ??`;
const SQL_SET_RU_TIME = 'set lc_time_names = "ru_RU"';
const SQL_GET_ALL_TOURNAMENTS = `
select t.id, t.img, t.title, date_format(t.start_date, "%d %M %Y") as date, t.author, 
t.color, t.toref, a.short_address as shortAddress, t.start_date as order_field 
from ${TABLE} as t inner join ${ADDRESS_TABLE} as a on t.address_id=a.id 
where year(start_date)=? order by start_date desc
`;
const SQL_GET_TOURNAMENT_INFO_BY_ID = `
select t.id, t.title, t.author, date_format(t.start_date, "%d %M %Y") as date, 
a.short_address as shortAddress, a.long_address as longAddress, a.city_img as cityImg 
from ${TABLE} as t inner join ${ADDRESS_TABLE} as a on t.address_id=a.id 
where t.id=?
`;
const SQL_GET_TABLES_INFO_BY_TOURNAMENT_ID = `
select name, column_names as columnNames, title 
from ${TOURNAMENT_TABLES} where tournament_id=?
`;
const SQL_DROP_TABLE = 'drop table if exists ??';
const SQL_GET_BELARUS_TOURNAMENT_RESULTS_AS_TEMPORARY = `create temporary table ${TEMPORARY_TABLE} as 
select tt.id as place, concat(p.family, " ", p.name) as player, p.city, tt.* 
from ?? as tt inner join ${PLAYERS_TABLE} as p on tt.player_id=p.id 
order by place asc
`;
const SQL_DROP_ID_AND_PLAYER_ID_FROM_TEMPORARY =
  `alter table ${TEMPORARY_TABLE} drop column id, drop column player_id`;
const SQL_GET_ALL_TEMPORARY = `select * from ${TEMPORARY_TABLE}`;

async function getAllByYear(year) {
  const sql = SQL_SET_RU_TIME + ';' + SQL_GET_ALL_TOURNAMENTS;
  return (await query.execute(sql, [year]))[1];
}

async function getInfoById(id) {
  return (await query.execute(SQL_GET_TOURNAMENT_INFO_BY_ID, [id]))[0];
}

async function getTablesInfoById(id) {
  return query.execute(SQL_GET_TABLES_INFO_BY_TOURNAMENT_ID, [id]);
}

async function getByResultsByName(tableName) {
  let sql;
  sql = SQL_DROP_TABLE + ';';
  sql += SQL_GET_BELARUS_TOURNAMENT_RESULTS_AS_TEMPORARY + ';';
  sql += SQL_DROP_ID_AND_PLAYER_ID_FROM_TEMPORARY + ';';
  sql += SQL_GET_ALL_TEMPORARY + ';';
  return (await query.execute(sql, [TEMPORARY_TABLE, tableName]))[3];
}

async function getResultsByName(tableName) {
  return query.execute(SQL_GET_ALL, [tableName]);
}
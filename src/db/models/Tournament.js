const connection = require('../connection');

const TN_PLAYERS = require('./Player').tableName;
const TN_ADDRESSES = process.env.DB_TN_ADDRESSES;
const TABLE_NAME = process.env.DB_TN_TOURNAMENTS;
const TN_TOURNAMENT_TABLES = process.env.DB_TN_TOURNAMENT_TABLES;
const TN_TEMPORARY = process.env.DB_TN_TEMPORARY;

const SQL_SELECT_ALL = `select * from ??`;
const SQL_SET_RU_TIME = 'set lc_time_names = "ru_RU"';
const SQL_SELECT_ALL_TOURNAMENTS = `
select t.id, t.img, t.title, date_format(t.start_date, "%d %M %Y") as date, t.author, 
t.color, t.toref, a.short_address as shortAddress, t.start_date as order_field 
from ${TABLE_NAME} as t inner join ${TN_ADDRESSES} as a on t.address_id=a.id 
where year(start_date)=? order by start_date desc
`;
const SQL_GET_TOURNAMENT_INFO_BY_ID = `
select t.id, t.title, t.author, date_format(t.start_date, "%d %M %Y") as date, 
a.short_address as shortAddress, a.long_address as longAddress, a.city_img as cityImg 
from ${TABLE_NAME} as t inner join ${TN_ADDRESSES} as a on t.address_id=a.id 
where t.id=?
`;
const SQL_GET_TABLES_INFO_BY_TOURNAMENT_ID = `
select name, column_names as columnNames, title 
from ${TN_TOURNAMENT_TABLES} where tournament_id=?
`;
const SQL_DROP_TABLE = 'drop table if exists ??';
const SQL_GET_BELARUS_TOURNAMENT_RESULTS_AS_TEMPORARY = `create temporary table ${TN_TEMPORARY} as 
select tt.id as place, concat(p.family, " ", p.name) as player, p.city, tt.* 
from ?? as tt inner join ${TN_PLAYERS} as p on tt.player_id=p.id 
order by place asc
`;
const SQL_DROP_ID_AND_PLAYERID_FROM_TEMPORARY =
  `alter table ${TN_TEMPORARY} drop column id, drop column player_id`;
const SQL_SELECT_ALL_TEMPORARY = `select * from ${TN_TEMPORARY}`;

class Tournament {
  static get tableName() {return TABLE_NAME}

  static async getAllByYear(year) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SET_RU_TIME + ';' + SQL_SELECT_ALL_TOURNAMENTS, year, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[1]);
      });
    });
  }

  static async getInfoById(id) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_TOURNAMENT_INFO_BY_ID, id, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      });
    });
  }

  static async getTablesInfoById(id) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_TABLES_INFO_BY_TOURNAMENT_ID, id, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }

  static async getByResultsByName(tableName) {
    let sql;
    sql = SQL_DROP_TABLE + ';';
    sql += SQL_GET_BELARUS_TOURNAMENT_RESULTS_AS_TEMPORARY + ';';
    sql += SQL_DROP_ID_AND_PLAYERID_FROM_TEMPORARY + ';';
    sql += SQL_SELECT_ALL_TEMPORARY + ';';

    return new Promise((resolve, reject) => {
      connection.query(sql, [TN_TEMPORARY, tableName],(e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[3]);
      });
    });
  }

  static async getResultsByName(tableName) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SELECT_ALL, tableName, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = Tournament;
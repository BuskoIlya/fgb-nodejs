const util = require('util');
const connection = require('./connection');
const playerTableName = require('./Player').tableName;
const addressesTableName = 'addresses';

const tableName = 'tournaments';
const tournamentTablesTableName = 'tournament_tables';
const temporaryTableName = 'temporary_table';
const sqlSetRuTime = 'set lc_time_names = \'ru_RU\';';
const sqlGelAllTournaments = `select 
t.id, t.img, t.title, date_format(t.start_date, '%d %M %Y') as date, t.author, 
t.color, t.toref, a.short_address 
from ${tableName} as t 
inner join ${addressesTableName} as a on t.address_id=a.id 
order by t.start_date desc;
`;
const sqlGetAllTournaments = `
select 
t.id, t.img, t.title, date_format(t.start_date, '%d %M %Y') as date, t.author, 
t.color, t.toref, a.short_address 
from ${tableName} as t 
inner join ${addressesTableName} as a on t.address_id=a.id 
`;
const byYear = ` where year(start_date)=%d order by start_date desc;`;
const sqlGetTournamentInfoById = `
select t.id, t.title, t.author, date_format(t.start_date, '%d %M %Y') as date, 
a.short_address, a.long_address, a.city_img 
from ${tableName} as t 
inner join ${addressesTableName} as a on t.address_id=a.id 
`;
const sqlById = 'where t.id=%d;';
const sqlGetTablesInfoByTournamentId =
  `select * from ${tournamentTablesTableName} where tournament_id=%d;`;
const sqlDropTable = 'drop table if exists %s;';
const sqlCreateTemporaryTableAs = `create temporary table ${temporaryTableName} as `;
const sqlGetResultTable = `
select tt.id as place, concat(p.family, ' ', p.name) as player, p.city, tt.* 
from %s as tt 
inner join ${playerTableName} as p on tt.player_id=p.id 
order by place asc;
`;
const sqlGetResultTableRu = `select * from %s;`;
const sqlGetResultTableWorld = `select * from %s;`;
const sqlDropIdAndPlayerIdColumnsFromTemporaryTable =
  `alter table ${temporaryTableName} drop column id, drop column player_id;`;
const sqlGetAllTemporaryData = `select * from ${temporaryTableName};`;

class Tournament {

  static get tableName() {return tableName}

  static getAll(callback) {
    const sql = sqlSetRuTime + sqlGelAllTournaments;
    connection.query(sql, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result[1]);
    });
  }

  static async getAllByYear(year) {
    return new Promise((resolve, reject) => {
      const sql = sqlSetRuTime + sqlGetAllTournaments + util.format(byYear, year);
      connection.query(sql, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[1]);
      });
    });
  }

  static async getInfoById(id) {
    return new Promise((resolve, reject) => {
      const sql = sqlGetTournamentInfoById + util.format(sqlById, id);
      connection.query(sql, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      });
    });
  }

  static async getTablesInfoById(id) {
    const sql = util.format(sqlGetTablesInfoByTournamentId, id);
    return new Promise((resolve, reject) => {
      connection.query(sql, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }

  static async getResultTableByName(tableName) {
    let sql;
    sql = util.format(sqlDropTable, temporaryTableName);
    sql += sqlCreateTemporaryTableAs;
    sql += util.format(sqlGetResultTable, tableName);
    sql += sqlDropIdAndPlayerIdColumnsFromTemporaryTable;
    sql += sqlGetAllTemporaryData;

    return new Promise((resolve, reject) => {
      connection.query(sql, (e, result) => {
        if (e) {
          console.log(`Не удалось получить информацию о результатах таблицы ${tableName}`);
          return reject(new Error(e));
        }
        return resolve(result[3]);
      });
    });
  }

  static async getResultTableRuByName(tableName) {
    const sql = util.format(sqlGetResultTableRu, tableName);
    return new Promise((resolve, reject) => {
      connection.query(sql, (e, result) => {
        if (e) {
          console.log(`Не удалось получить информацию о результатах таблицы ${tableName}`);
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }

  static async getResultTableWorldByName(tableName) {
    const sql = util.format(sqlGetResultTableWorld, tableName);
    return new Promise((resolve, reject) => {
      connection.query(sql, (e, result) => {
        if (e) {
          console.log(`Не удалось получить информацию о результатах таблицы ${tableName}`);
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = Tournament;
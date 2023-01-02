const util = require('util');
const connection = require('./connection');
const playerTableName = require('./Player').tableName;

const tableName = 'tournaments';
const tournamentTablesTableName = 'tournament_tables';
const temporaryTableName = 'temporary_table';
const sqlSetRuTime = 'set lc_time_names = \'ru_RU\';';
const sqlGelAllTournaments = `select 
id, img, title, date_format(start_date, '%d %M %Y') as date, address, author 
from ${tableName} order by start_date desc;
`;
const sqlGetAllTournamentsByYear = `
select * from ${tableName} where year(start_date)=%d order by start_date desc
`;
const sqlGetTournamentInfoById = `select * from ${tableName} where id=%d;`;
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
      const sql = util.format(sqlGetAllTournamentsByYear, year);
      connection.query(sql, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }

  static async getInfoById(id) {
    return new Promise((resolve, reject) => {
      const sql = util.format(sqlGetTournamentInfoById, id);
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
}

module.exports = Tournament;
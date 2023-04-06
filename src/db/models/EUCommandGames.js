const connection = require('../connection');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE_NAME = process.env.DB_TN_EU_COMMAND_GAMES;
const SQL_SET_RU_TIME = 'set lc_time_names = "ru_RU"';
const SQL_GET_ROUNDS_COUNT = `
select count(distinct round_number) as round_count from ${TABLE_NAME} 
where year=? and group_name=?
`;
const SQL_GET_ROUNDS_AND_DATES = `
select distinct round_number as number, date_format(round_date, "%d %M %Y") as date 
from ${TABLE_NAME} 
where year=? and group_name=? order by round_number asc
`;
const SQL_SELECT_ROUND_GAMES = `
select e.result, 
c1.name as cmd_1, c1.flag_img as cmd_1_flag, 
c2.name as cmd_2, c2.flag_img as cmd_2_flag 
from ${TABLE_NAME} as e 
inner join ${COUNTRIES_TABLE} as c1 on c1.id=e.cmd1_id 
inner join ${COUNTRIES_TABLE} as c2 on c2.id=e.cmd2_id 
where e.year=? and e.group_name=? and e.round_number=? 
order by e.id asc
`;

class EUCommandGames{
  static get tableName() {return TABLE_NAME}

  static async getRoundsCount(year, group) {
    return new Promise((resolve, reject) =>
      connection.query(SQL_GET_ROUNDS_COUNT, [year, group], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0].round_count);
      })
    );
  }

  static async getRoundsAndDates(year, group) {
    return new Promise((resolve, reject) =>
      connection.query(SQL_SET_RU_TIME + ';' + SQL_GET_ROUNDS_AND_DATES, [year, group], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[1]);
      })
    );
  }

  static async getRoundGames(year, group, roundNumber) {
    return new Promise((resolve, reject) =>
      connection.query(SQL_SELECT_ROUND_GAMES, [year, group, roundNumber], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    );
  }
}

module.exports = EUCommandGames;
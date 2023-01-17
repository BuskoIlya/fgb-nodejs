const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TABLE_NAME = process.env.DB_TN_NATIONAL_TEAM_GAMES;
const SQL_SET_RU_TIME = `SET lc_time_names = 'ru_RU'`;
const SQL_SELECT_FULL_TEAM_GAME_DATA = `
select 
ntg.round_title, ntg.city_img, date_format(ntg.game_date, '%d %M %Y') as game_date, 
ntg.short_address, ntg.long_address, ntg.author, ntg.game_ref, ntg.game_title, 
ntg.group_ref, ntg.group_name, ntg.team1_score, ntg.team2_score, 
ntg.team1 as team1_id, ntg.team2 as team2_id, 
c1.name as team1_name, c1.flag_img as team1_flag, 
c2.name as team2_name, c2.flag_img as team2_flag 
from ${TABLE_NAME} as ntg 
inner join ${TN_COUNTRIES} as c1 on c1.id=ntg.team1 
inner join ${TN_COUNTRIES} as c2 on c2.id=ntg.team2 
where ntg.id=?
`;
const SQL_SELECT_ALL_TEAM_GAMES_BY_YEAR = `
select tg.id, tg.img, tg.game_title as title, 
date_format(tg.game_date, "%d %M %Y") as date, tg.author, tg.game_date as order_field 
from ${TABLE_NAME} as tg 
where year(game_date)=? order by game_date desc
`;

class NationalTeamGame {
  static get tableName() {return TABLE_NAME}

  static async getFullDataById(id) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SET_RU_TIME + ';' + SQL_SELECT_FULL_TEAM_GAME_DATA, id, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[1][0]);
      });
    });
  }

  static async getAllByYear(year) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SET_RU_TIME + ';' + SQL_SELECT_ALL_TEAM_GAMES_BY_YEAR, year, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[1]);
      });
    });
  }
}

module.exports = NationalTeamGame;
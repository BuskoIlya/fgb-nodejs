const connection = require('../connection');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE_NAME = process.env.DB_TN_NATIONAL_TEAM_GAMES;
const SQL_SET_RU_TIME = `SET lc_time_names = 'ru_RU'`;
const SQL_SELECT_FULL_TEAM_GAME_DATA = `
select 
ntg.round_title as round, ntg.city_img as cityImg, date_format(ntg.game_date, '%d %M %Y') as date, 
ntg.short_address as shortAddress, ntg.long_address as longAddress, ntg.author, ntg.game_ref as gameRef, ntg.game_title as gameTitle, 
ntg.group_ref as groupRef, ntg.group_name as groupName, ntg.team1_score as score1, ntg.team2_score as score2, 
ntg.team1 as team1_id, ntg.team2 as team2_id, 
c1.name as team1Name, c1.flag_img as team1Flag, 
c2.name as team2Name, c2.flag_img as team2Flag 
from ${TABLE_NAME} as ntg 
inner join ${COUNTRIES_TABLE} as c1 on c1.id=ntg.team1 
inner join ${COUNTRIES_TABLE} as c2 on c2.id=ntg.team2 
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
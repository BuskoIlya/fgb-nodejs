const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TN_NATIONAL_TEAM_PLAYERS = require('./NationalTeamPlayer').tableName;
const TABLE_NAME = process.env.DB_TN_NATIONAL_PLAYER_GAMES;
const SQL_SELECT_PLAYER_GAMES_OF_TEAM_GAME = `
select 
ntp1.name as black_player, c1.flag_img as black_flag, 
ntp2.name as white_player, c2.flag_img as white_flag, 
npg.winner, npg.result, npg.ref as game_ref 
from ${TABLE_NAME} as npg 
inner join ${TN_NATIONAL_TEAM_PLAYERS} as ntp1 on ntp1.id=npg.black_player_id 
inner join ${TN_NATIONAL_TEAM_PLAYERS} as ntp2 on ntp2.id=npg.white_player_id 
inner join ${TN_COUNTRIES} as c1 on c1.id=ntp1.country_id 
inner join ${TN_COUNTRIES} as c2 on c2.id=ntp2.country_id 
where npg.team_game_id=?
`;
const SQL_GET_PLAYERS_IN_TEAM_GAME_BY_TEAM_ID = `
select 
ntp.name, ntp.img, 
case 
when (npg.winner='b' and npg.black_player_id=ntp.id) or (npg.winner='w' and npg.white_player_id=ntp.id) 
then 1 else 0 
end as score 
from ${TN_NATIONAL_TEAM_PLAYERS} as ntp 
inner join ${TABLE_NAME} as npg on npg.black_player_id=ntp.id or npg.white_player_id=ntp.id 
where ?=ntp.country_id and npg.team_game_id=?
`;

class NationalPlayerGame {
  static get tableName() {return TABLE_NAME}

  static async getPlayersByTeamGameId(teamGameId) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SELECT_PLAYER_GAMES_OF_TEAM_GAME, teamGameId, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }

  static async getPlayersInTeamGameByTeamId(teamGameId, teamId) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_PLAYERS_IN_TEAM_GAME_BY_TEAM_ID, [teamId, teamGameId], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    })
  }
}

module.exports = NationalPlayerGame;
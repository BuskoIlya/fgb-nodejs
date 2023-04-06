module.exports = { getPlayersByGameId, getPlayersInGameByTeamId };

const { query } = require('../../db');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const NATIONAL_TEAM_PLAYERS_TABLE = process.env.DB_TN_NATIONAL_TEAM_PLAYERS;
const TABLE = process.env.DB_TN_NATIONAL_PLAYER_GAMES;
const SQL_GET_PLAYER_GAMES_OF_TEAM_GAME = `
select 
ntp1.name as black_player, c1.flag_img as black_flag, 
ntp2.name as white_player, c2.flag_img as white_flag, 
npg.winner, npg.result, npg.ref as game_ref 
from ${TABLE} as npg 
inner join ${NATIONAL_TEAM_PLAYERS_TABLE} as ntp1 on ntp1.id=npg.black_player_id 
inner join ${NATIONAL_TEAM_PLAYERS_TABLE} as ntp2 on ntp2.id=npg.white_player_id 
inner join ${COUNTRIES_TABLE} as c1 on c1.id=ntp1.country_id 
inner join ${COUNTRIES_TABLE} as c2 on c2.id=ntp2.country_id 
where npg.team_game_id=?
`;
const SQL_GET_PLAYERS_IN_TEAM_GAME_BY_TEAM_ID = `
select 
ntp.name, ntp.img, 
case 
when (npg.winner='b' and npg.black_player_id=ntp.id) or (npg.winner='w' and npg.white_player_id=ntp.id) 
then 1 else 0 
end as score 
from ${NATIONAL_TEAM_PLAYERS_TABLE} as ntp 
inner join ${TABLE} as npg on npg.black_player_id=ntp.id or npg.white_player_id=ntp.id 
where ?=ntp.country_id and npg.team_game_id=?
`;

async function getPlayersByGameId(teamGameId) {
  return query.execute(SQL_GET_PLAYER_GAMES_OF_TEAM_GAME, [teamGameId]);
}

async function getPlayersInGameByTeamId(teamGameId, teamId) {
  return query.execute(SQL_GET_PLAYERS_IN_TEAM_GAME_BY_TEAM_ID, [teamId, teamGameId]);
}
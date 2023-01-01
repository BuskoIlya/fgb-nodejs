const connection = require('./connection');

const tableName = 'players';
const sqlGelAllPlayers = `select 
concat(family, ' ', name, ' ', ifnull(father, '')) as fio, 
city, sport_rank, score 
from ${tableName} order by score desc;
`;

class Player {

  static get tableName() {return tableName}

  static getAll(callback) {
    connection.query(sqlGelAllPlayers, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Player;
const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_PLAYERS;
const SQL_SELECT_ALL_PLAYERS = `select concat(family, ' ', name, ' ', ifnull(father, '')) as fio, 
city, sport_rank, score from ${TABLE_NAME} order by score desc`;

class Player {
  static get tableName() {return TABLE_NAME}

  static getAll(callback) {
    connection.query(SQL_SELECT_ALL_PLAYERS, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Player;
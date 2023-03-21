const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_RANKS;
const SQL_SELECT_ALL_RANKS = `
select concat(min, ' - ', max) as scores, 
sport_rank as sportRank from ${TABLE_NAME} order by id desc`;

class Rank {
  static get tableName() {return TABLE_NAME}

  static getAll(callback) {
    connection.query(SQL_SELECT_ALL_RANKS, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Rank;
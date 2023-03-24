const connection = require('../connection');

const TN_PLAYERS = require('./Player').tableName;
const TABLE_NAME = process.env.DB_TN_CONTACTS;
const SQL_SELECT_ALL_CONTACTS = `
select concat(p.family, ' ', p.name, ' ', ifnull(p.father, '')) as fullName, 
p.sport_rank as sportRank, c.img, c.description, c.phone, c.email 
from ${TABLE_NAME} as c inner join ${TN_PLAYERS} as p on c.player_id=p.id 
order by c.id asc`;

class Contact {
  static get tableName() {return TABLE_NAME}

  static getAll(callback) {
    connection.query(SQL_SELECT_ALL_CONTACTS, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Contact;
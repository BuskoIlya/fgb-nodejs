const util = require('util');
const connection = require('./connection');

const tableName = 'countries';
const sqlGetAll = `select * from ${tableName}`;

class Country {

  static get tableName() {return tableName}

  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(sqlGetAll, (e, result) => {
        if (e) {
          console.log(`Не удалось получить информацию о странах`);
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = Country;
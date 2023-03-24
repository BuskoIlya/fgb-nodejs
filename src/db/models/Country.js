const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_COUNTRIES;
const SQL_SELECT_ALL_COUNTRIES = `select id, name, flag_img as flagImg from ${TABLE_NAME}`;

class Country {
  static get tableName() {return TABLE_NAME}

  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SELECT_ALL_COUNTRIES, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = Country;
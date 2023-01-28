const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_USERS;
const SQL_LOGIN = `select * from ${TABLE_NAME} where login=? and password=?`;

class User {
  static get tableName() {return TABLE_NAME}

  static async login(login, password) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_LOGIN, [login, password], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve({token: result[0].id});
      })
    });
  }
}

module.exports = User;
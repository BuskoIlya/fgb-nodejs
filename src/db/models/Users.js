const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_USERS;
const SQL_GET_USER = `select * from ${TABLE_NAME} where login=?`;
const SQL_REGISTER = `insert into ${TABLE_NAME} (login, passwordHash) values(?, ?)`;

class User {
  static get tableName() {return TABLE_NAME}

  static async register(login, passwordHash) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_REGISTER, [login, passwordHash], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    });
  }

  static async getUser(login) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_USER, login, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      })
    });
  }
}

module.exports = User;
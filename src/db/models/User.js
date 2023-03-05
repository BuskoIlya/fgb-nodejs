const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_USERS;
const SQL_GET_BY_ID = `select * from ${TABLE_NAME} where id=?`;
const SQL_GET_BY_EMAIL = `select * from ${TABLE_NAME} where email=?`;
const SQL_REGISTER = `insert into ${TABLE_NAME} (email, passwordHash) values(?, ?)`;
const SQL_UPDATE = `
update ${TABLE_NAME} 
set email=?, passwordHash=?, family=?, name=?, father=?, 
birthdate=?, city=?, img=?, isPlayer=? 
where id=?
`;

class User {
  static get tableName() {return TABLE_NAME}

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_BY_ID, id, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      })
    });
  }

  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_BY_EMAIL, email, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      })
    });
  }

  static async register(email, passwordHash) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_REGISTER, [email, passwordHash], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    });
  }

  static async update(
    {
      id, email, passwordHash,
      family, name, father,
      birthdate, city, img, isPlayer
    })
  {
    return new Promise((resolve, reject) => {
      connection.query(
        SQL_UPDATE,
        [email, passwordHash, family, name, father, birthdate, city, img, isPlayer, id],
        (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    });
  }
}

module.exports = User;
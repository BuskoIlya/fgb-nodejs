const connection = require('../connection');

const TABLE_NAME = process.env.DB_TN_BOOKS;
const SQL_SELECT_ALL_BOOKS = `
select id, title, author, color, category, img from ${TABLE_NAME} order by id asc`;
const SQL_GET_BOOK_BY_ID = `select * from ${TABLE_NAME} where id=?`;

class Book {
  static get tableName() {return TABLE_NAME}

  static getAll(callback) {
    connection.query(SQL_SELECT_ALL_BOOKS, (e, result) => {
      if (e) {
        callback(e, null);
      }
      callback(null, result);
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_BOOK_BY_ID, id, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result[0]);
      });
    });
  }
}

module.exports = Book;
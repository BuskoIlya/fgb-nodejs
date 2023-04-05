module.exports = { getAll, getById };

const query = require('../../db/query');

const TABLE = process.env.DB_TN_BOOKS;
const SQL_GET_ALL_BOOKS = `select * from ${TABLE} order by id asc`;
const SQL_GET_BOOK_BY_ID = `select * from ${TABLE} where id=?`;

async function getAll() {
  return query.execute(SQL_GET_ALL_BOOKS);
}

async function getById(id) {
  return (await query.execute(SQL_GET_BOOK_BY_ID, [id]))[0];
}
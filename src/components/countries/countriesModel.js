module.exports = { getAll };

const query = require('../../db/query');

const TABLE = process.env.DB_TN_COUNTRIES;
const SQL_GET_ALL_COUNTRIES = `select id, name, flag_img as flagImg from ${TABLE}`;

async function getAll() {
  return query.execute(SQL_GET_ALL_COUNTRIES);
}
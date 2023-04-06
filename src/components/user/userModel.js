module.exports = { create, getByEmail, getById, update };

const { query } = require('../../db');

const TABLE = process.env.DB_TN_USERS;
const SQL_CREATE = `insert into ${TABLE} (email, password) values(?, ?)`;
const SQL_GET_BY_EMAIL = `select * from ${TABLE} where email=?`;
const SQL_GET_BY_ID = `select * from ${TABLE} where id=?`;

async function create(email, password) {
  await query.execute(SQL_CREATE, [email, password]);
  return getByEmail(email);
}

async function getByEmail(email) {
  return (await query.execute(SQL_GET_BY_EMAIL, [email]))[0];
}

async function getById(id) {
  return (await query.execute(SQL_GET_BY_ID, [id]))[0];
}

async function update(newData, id) {
  return query.execute(`update ${TABLE} set ${newData} where id=${id}`);
}
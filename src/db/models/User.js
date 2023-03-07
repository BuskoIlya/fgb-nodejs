module.exports.getByEmail = getByEmail;
module.exports.getById = getById;
module.exports.register = register;
module.exports.update = update;

const query = require('../../utils/query');
const TABLE_NAME = process.env.DB_TN_USERS;
const SQL_GET_BY_ID = `
select email, passwordHash, 
ifnull(family, '') as family, ifnull(name, '') as name, 
ifnull(father, '') as father, ifnull(birthdate, '') as birthdate, 
ifnull(city, '') as city, ifnull(isPlayer, false) as isPlayer 
from ${TABLE_NAME} where id=?
`;
const SQL_GET_BY_EMAIL = `select * from ${TABLE_NAME} where email=?`;
const SQL_REGISTER = `insert into ${TABLE_NAME} (email, passwordHash) values(?, ?)`;

async function getByEmail(email) {
  return (await query.execute(SQL_GET_BY_EMAIL, [email]))[0];
}
async function getById(id) {
  return (await query.execute(SQL_GET_BY_ID, [id]))[0];
}

async function register(email, passwordHash) {
  return query.execute(SQL_REGISTER, [email, passwordHash]);
}

async function update(newData, id) {
  return query.execute(`update ${TABLE_NAME} set ${newData} where id=${id}`);
}
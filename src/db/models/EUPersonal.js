const connection = require('../connection');

const COUNTRIES_TABLE = process.env.DB_TN_COUNTRIES;
const TABLE_NAME = process.env.DB_TN_EU_PERSONAL;
const SQL_SELECT_ALL = `
select e.year, c.name as country, c.flag_img as flag, e.city, 
c1.name as country1, c1.flag_img as flag1, e.g_name as name1 
from ${TABLE_NAME} as e 
inner join ${COUNTRIES_TABLE} as c on e.country_id=c.id 
inner join ${COUNTRIES_TABLE} as c1 on e.g_country=c1.id 
order by year desc`;

class EUPersonal {
  static get tableName() {return TABLE_NAME}

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query(SQL_SELECT_ALL, (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      });
    });
  }
}

module.exports = EUPersonal;
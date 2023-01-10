const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TABLE_NAME = process.env.DB_TN_EU_PERSONAL;
const SQL_SELECT_ALL = `
select e.year, c.name as country, c.flag_img as flag, e.city, 
c1.name as g_country, c1.flag_img as g_flag 
from ${TABLE_NAME} as e 
inner join ${TN_COUNTRIES} as c on e.country_id=c.id 
inner join ${TN_COUNTRIES} as c1 on e.g_country=c1.id 
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
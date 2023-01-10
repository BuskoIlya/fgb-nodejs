const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TABLE_NAME = process.env.DB_TN_WAGC;
const SQL_SELECT_ALL = `
select w.year, c.name as country, c.flag_img as flag_country, 
w.city, 
w.g_name, c1.name as g_country, c1.flag_img as g_flag_country, 
w.s_name, c2.name as s_country, c2.flag_img as s_flag_country, 
w.b_name, c3.name as b_country, c3.flag_img as b_flag_country 
from ${TABLE_NAME} as w 
inner join ${TN_COUNTRIES} as c on w.country_id=c.id 
inner join ${TN_COUNTRIES} as c1 on w.g_country=c1.id 
inner join ${TN_COUNTRIES} as c2 on w.s_country=c2.id 
inner join ${TN_COUNTRIES} as c3 on w.b_country=c3.id 
order by year desc`;

class WAGC {
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

module.exports = WAGC;
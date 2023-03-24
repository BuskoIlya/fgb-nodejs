const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TABLE_NAME = process.env.DB_TN_EU_COMMAND;
const SQL_SELECT_ALL = `
select e.year, c.name as country, c.flag_img as flag, e.city, 
c1.name as country1, c1.flag_img as flag1, 
c2.name as country2, c2.flag_img as flag2, 
c3.name as country3, c3.flag_img as flag3 
from ${TABLE_NAME} as e 
inner join ${TN_COUNTRIES} as c on e.country_id=c.id 
inner join ${TN_COUNTRIES} as c1 on e.g_country=c1.id 
inner join ${TN_COUNTRIES} as c2 on e.s_country=c2.id 
inner join ${TN_COUNTRIES} as c3 on e.b_country=c3.id 
order by year desc`;

class EUCommand {
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

module.exports = EUCommand;
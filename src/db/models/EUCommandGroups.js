const connection = require('../connection');

const TN_COUNTRIES = require('./Country').tableName;
const TABLE_NAME = process.env.DB_TN_EU_COMMAND_GROUPS;
const SQL_GET_GROUP_RESULTS_BY_YEAR_AND_GROUP = `
select e.*, c.name as country, c.flag_img as flag_country 
from ${TABLE_NAME} as e 
inner join ${TN_COUNTRIES} as c on c.id=e.country_id 
where year=? and eu_cmd_group=? 
order by score desc`;

class EUCommandGroups {
  static get tableName() {return TABLE_NAME}

  static async getGroupResultsByYearAndGroup(year, group) {
    return new Promise((resolve, reject) => {
      connection.query(SQL_GET_GROUP_RESULTS_BY_YEAR_AND_GROUP, [year, group], (e, result) => {
        if (e) {
          return reject(new Error(e));
        }
        return resolve(result);
      })
    });
  }

}

module.exports = EUCommandGroups;
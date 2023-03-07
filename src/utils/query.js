module.exports.execute = execute;

const connection = require('../db/connection');

async function execute(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (e, result) => {
      if (e) {
        return reject(new Error(e));
      }
      return resolve(result);
    })
  });
}
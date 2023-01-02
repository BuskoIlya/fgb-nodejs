const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  multipleStatements: true
});

connection.connect(e => {
  if (e) {
    return console.error('Ошибка подключения: ' + e.message);
  }
  console.log('Подключение к базе данных успешно');
});

module.exports = connection;
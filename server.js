require('dotenv/config');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./src/routers');

app.use(cors());
app.use(express.json());

app.use(process.env.API, router);
app.get('/*', (req, res) => {
  res.sendFile(process.env.PATH_INDEX, function(e) {
    if (e) {
      console.error(`Внутренняя ошибка сервера: ${e}`);
      return res.status(500).json({
        error: 'Внутренняя ошибка сервера'
      });
    }
  })
});

app.listen(process.env.PORT, () => console.log('Сервер запущен'));
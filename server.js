require('dotenv/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const router = require('./src/routers');

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use(process.env.API, router);
app.get('/*', (req, res) => {
  res.sendFile(process.env.PATH_INDEX, function(e) {
    if (e) {
      console.error(`Внутренняя ошибка сервера: ${e}`);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  })
});

app.listen(process.env.PORT, () => console.log('Сервер запущен'));
require('dotenv/config');
const express = require('express');
const cors = require('cors');

const tournaments = require("./src/tournaments.js");
const players = require("./src/players.js");

const app = express();
app.use(cors());

app.get(process.env.API_TOURNAMENTS, function (req, res) {res.json(tournaments)});
app.get(process.env.API_PLAYERS, function (req, res) {res.json(players)});

app.listen(process.env.PORT);
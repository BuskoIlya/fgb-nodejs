const express = require('express');
const cors = require('cors');

const tournaments = require("./src/tournaments.js");
const players = require("./src/players.js");

const app = express();
app.use(cors());

app.get('/api/tournaments', function (req, res) {res.json(tournaments)});
app.get('/api/players', function (req, res) {res.json(players)});

app.listen(4000);
require('dotenv/config');
const express = require('express');
const cors = require('cors');

const tournaments = require("./src/tournaments.js");
const home_tournaments = require("./src/home_tournaments.js");
const players = require("./src/players.js");
const contacts = require("./src/contacts.js");
const ranks = require("./src/ranks.js");
const news = require("./src/news.js");

const app = express();
app.use(cors());

app.get(process.env.API_TOURNAMENTS, function (req, res) { res.json(tournaments) });
app.get(process.env.API_HOME_TOURNAMENTS, function (req, res) { res.json(home_tournaments) });
app.get(process.env.API_PLAYERS, function (req, res) { res.json(players) });
app.get(process.env.API_CONTACTS, function (req, res) { res.json(contacts) });
app.get(process.env.API_RANKS, function (req, res) { res.json(ranks) });
app.get(process.env.API_NEWS, function (req, res) { res.json(news) });

app.listen(process.env.PORT);
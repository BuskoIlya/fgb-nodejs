require('dotenv/config');
const express = require('express');
const cors = require('cors');

const tournaments = require("./src/tournaments.js");
const homeTournaments = require("./src/home_tournaments.js");
const players = require("./src/players.js");
const contacts = require("./src/contacts.js");
const ranks = require("./src/ranks.js");
const news = require("./src/news.js");
const worldChampionships = require("./src/world_championships.js");
const euPersonal = require("./src/eu_personal.js");
const euCommand = require("./src/eu_command.js");
const euCommand1920A = require("./src/eu_command_19-20_A.js");
const euCommand1920B = require("./src/eu_command_19-20_B.js");
const euCommand1920C = require("./src/eu_command_19-20_C.js");
const euCommand1920D = require("./src/eu_command_19-20_D.js");
const euCommand2021A = require("./src/eu_command_20-21_A.js");
const euCommand2021B = require("./src/eu_command_20-21_B.js");
const euCommand2021C = require("./src/eu_command_20-21_C.js");
const euCommand2021D = require("./src/eu_command_20-21_D.js");
const goStudyStories = require("./src/go_study_stories.js");
const goStudyBooks = require("./src/books.js");

const app = express();
app.use(cors());

app.get(process.env.API_TOURNAMENTS, function (req, res) { res.json(tournaments) });
app.get(process.env.API_HOME_TOURNAMENTS, function (req, res) { res.json(homeTournaments) });
app.get(process.env.API_PLAYERS, function (req, res) { res.json(players) });
app.get(process.env.API_CONTACTS, function (req, res) { res.json(contacts) });
app.get(process.env.API_RANKS, function (req, res) { res.json(ranks) });
app.get(process.env.API_NEWS, function (req, res) { res.json(news) });
app.get(process.env.API_WORLD_CHAMPIONSHIPS, function (req, res) { res.json(worldChampionships) });
app.get(process.env.API_EU_PERSONAL, function (req, res) { res.json(euPersonal) });
app.get(process.env.API_EU_COMMAND, function (req, res) { res.json(euCommand) });
app.get(process.env.API_EU_COMMAND_19_20_A, function (req, res) { res.json(euCommand1920A) });
app.get(process.env.API_EU_COMMAND_19_20_B, function (req, res) { res.json(euCommand1920B) });
app.get(process.env.API_EU_COMMAND_19_20_C, function (req, res) { res.json(euCommand1920C) });
app.get(process.env.API_EU_COMMAND_19_20_D, function (req, res) { res.json(euCommand1920D) });
app.get(process.env.API_EU_COMMAND_20_21_A, function (req, res) { res.json(euCommand2021A) });
app.get(process.env.API_EU_COMMAND_20_21_B, function (req, res) { res.json(euCommand2021B) });
app.get(process.env.API_EU_COMMAND_20_21_C, function (req, res) { res.json(euCommand2021C) });
app.get(process.env.API_EU_COMMAND_20_21_D, function (req, res) { res.json(euCommand2021D) });
app.get(process.env.API_GO_STUDY_STORIES, function (req, res) { res.json(goStudyStories) });
app.get(process.env.API_GO_STUDY_BOOKS, function (req, res) { res.json(goStudyBooks) });

app.listen(process.env.PORT);